var $ = window.jQuery;

	console.log("TM connected");

	// Validate function

	function validateForm(form) {
		var invalid = 0;
		form.find("input, select, radio, textarea").each(function () {
			if ($(this).val() == "") {
				invalid++;
			}
		});

		if (invalid > 0) {
			return false;
		} else {
			return true;
		}
	}

	function validateCheck(form) {
		var invalid = 0;
		form.find("input:checked").each(function () {
			invalid++;
		});

		if (invalid === 0) {
			return false;
		} else {
			return true;
		}
	}

	// Form funcs

	let values = [];

	$(".quiz-slide-wrap").each(function () {
		if ($(this).find("input, select, radio, textarea").length > 0) {
			$(this).find("a.slider-right").css({
				background: "#002f69",
				pointerEvents: "none",
				userSelect: "none",
			});
		}
	});

	$("#Name-Input").on("keyup change", function () {
		$("#Name-Output").text($(this).val());
	});

	// Value change function inputs

	$("input:not([type='checkbox']), select").on("keyup change", function (e) {
		let form_parent = $(this).closest(".quiz-slide-wrap");
		let form_next = form_parent.find(".slider-right");
		let inputs = form_parent.find("input, select, radio, textarea");
		let status = validateForm(form_parent);
		inputs.each(() => {
			let objIndex = values.findIndex(
				(obj) => obj.name == $(this).attr("name")
			);
			if (objIndex === -1) {
				values.push({
					name: $(this).attr("name"),
					value: $(this).val(),
				});
			} else {
				values[objIndex].value = $(this).val();
			}

			// console.clear();
			// console.log(objIndex, values);
		});

		if (status === true) {
			form_next.css({ background: "#dbb2fb", pointerEvents: "all" });
		} else {
			form_next.css({ background: "#002f69", pointerEvents: "none" });
		}
	});

	// Value change function Checkboxes

	$(".checkbox_wrap").on("click", function (e) {
		let form_parent = $(this).closest(".quiz-slide-wrap");
		let form_next = form_parent.find(".slider-right");
		let checks_test = $(this).find(":checked");
		let check_name = $(this).find("input:checkbox").first().attr("name");

		let checks_values = [];
		let checks_values_final = { name: check_name, value: checks_values };

		let objIndex = values.findIndex((obj) => obj.name == check_name);

		if (objIndex === -1) {
			checks_test.each(function () {
				let value = $(this)
					.closest("label")
					.find(".quiz-checkbox-text")
					.text();

				checks_values.push(value);
			});
			values.push(checks_values_final);
		} else {
			checks_test.each(function () {
				let value = $(this)
					.closest("label")
					.find(".quiz-checkbox-text")
					.text();

				checks_values.push(value);
			});
			values[objIndex].value = checks_values;
		}

		let status = validateCheck($(this));

		if (status === true) {
			form_next.css({ background: "#dbb2fb", pointerEvents: "all" });
		} else {
			form_next.css({ background: "#002f69", pointerEvents: "none" });
		}

		// console.clear();
		// console.log(status, values);
	});

	// Generate fields

	let calc_btn = $("#quiz-calculate");
	let array_target = $("#array_target");

	calc_btn.click(function () {
		array_target.html(``);

		values.map((item) => {
			// console.log(item);

			array_target.append(
				`<input style="color: #000;" type="hidden" id="quiz-${item.name}" name="quiz-${item.name}" placeholder="${item.name}" value="${item.value}"></input>`
			);
		});

		// return function

		function returnInput(name, value) {
			return `<input style="color: #000;" type="hidden" id="quiz-${name}" name="quiz-${name}" placeholder="${name}" value="${value}"></input>`;
		}

		// New Salary

		if ($("#quiz-ANNUIN").val() === "<$50k") {
			array_target.append(returnInput("NEWSALARY", "4000"));
		} else if ($("#quiz-ANNUIN").val() === "$51-100k") {
			array_target.append(returnInput("NEWSALARY", "6000"));
		} else if ($("#quiz-ANNUIN").val() === "$101-150k") {
			array_target.append(returnInput("NEWSALARY", "12500"));
		} else if ($("#quiz-ANNUIN").val() === "$151k-200k") {
			array_target.append(returnInput("NEWSALARY", "14500"));
		} else if ($("#quiz-ANNUIN").val() === ">$200k") {
			array_target.append(returnInput("NEWSALARY", "21000"));
		}

		// Debt Amount

		if ($("#quiz-DEBT").val() === "<$5k") {
			array_target.append(returnInput("DEBTAMOUNT", "4000"));
		} else if ($("#quiz-DEBT").val() === "$5-10k") {
			array_target.append(returnInput("DEBTAMOUNT", "6000"));
		} else if ($("#quiz-DEBT").val() === "$10-25k") {
			array_target.append(returnInput("DEBTAMOUNT", "15000"));
		} else if ($("#quiz-DEBT").val() === ">$25k") {
			array_target.append(returnInput("DEBTAMOUNT", "25000"));
		}

		// Investment Increase

		if ($("#quiz-ANNUIN").val() === "<$50k") {
			array_target.append(
				returnInput(
					"INVINCREASE",
					parseFloat(0.0351 * 25000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$51-100k") {
			array_target.append(
				returnInput(
					"INVINCREASE",
					parseFloat(0.0702 * 51000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$101-150k") {
			array_target.append(
				returnInput(
					"INVINCREASE",
					parseFloat(0.0702 * 101000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$151k-200k") {
			array_target.append(
				returnInput(
					"INVINCREASE",
					parseFloat(0.0702 * 151000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === ">$200k") {
			array_target.append(
				returnInput(
					"INVINCREASE",
					parseFloat(0.0702 * 201000).toFixed(2)
				)
			);
		}

		// Savings Increase

		if ($("#quiz-ANNUIN").val() === "<$50k") {
			array_target.append(
				returnInput(
					"SAVEINCREASE",
					parseFloat(0.0975 * 25000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$51-100k") {
			array_target.append(
				returnInput(
					"SAVEINCREASE",
					parseFloat(0.1625 * 51000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$101-150k") {
			array_target.append(
				returnInput(
					"SAVEINCREASE",
					parseFloat(0.1625 * 101000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$151k-200k") {
			array_target.append(
				returnInput(
					"SAVEINCREASE",
					parseFloat(0.1625 * 151000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === ">$200k") {
			array_target.append(
				returnInput(
					"SAVEINCREASE",
					parseFloat(0.1625 * 201000).toFixed(2)
				)
			);
		}

		// Retirement Increase

		if ($("#quiz-ANNUIN").val() === "<$50k") {
			array_target.append(
				returnInput(
					"RETIREINCREASE",
					parseFloat(0.108 * 35000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$51-100k") {
			array_target.append(
				returnInput(
					"RETIREINCREASE",
					parseFloat(0.162 * 65000).toFixed(2)
				)
			);
		} else if ($("#quiz-ANNUIN").val() === "$101-150k") {
			array_target.append(
				returnInput("RETIREINCREASE", parseFloat(0.73*22500).toFixed(2))
			);
		} else if ($("#quiz-ANNUIN").val() === "$151k-200k") {
			array_target.append(
				returnInput("RETIREINCREASE", parseFloat(22500).toFixed(2))
			);
		} else if ($("#quiz-ANNUIN").val() === ">$200k") {
			array_target.append(
				returnInput("RETIREINCREASE", parseFloat(22500).toFixed(2))
			);
		}

		// Debt paid off

		if ($("#quiz-DEBT").val() === "<$5k") {
			array_target.append(returnInput("DEBTTEXT", "All"));
			array_target.append(returnInput("DEBTPAID", "4000"));
			array_target.append(returnInput("DEBTPAIDNET", "5000"));
		} else if ($("#quiz-DEBT").val() === "$5-10k") {
			array_target.append(returnInput("DEBTTEXT", "Most"));
			array_target.append(returnInput("DEBTPAID", "7500"));
			array_target.append(returnInput("DEBTPAIDNET", "7500"));
		} else if ($("#quiz-DEBT").val() === "$10-25k") {
			array_target.append(returnInput("DEBTTEXT", "Most"));
			array_target.append(returnInput("DEBTPAID", "11000"));
			array_target.append(returnInput("DEBTPAIDNET", "11000"));
		} else if ($("#quiz-DEBT").val() === ">$25k") {
			array_target.append(returnInput("DEBTTEXT", "More than half"));
			array_target.append(returnInput("DEBTPAID", "25000"));
			array_target.append(returnInput("DEBTPAIDNET", "18000"));
		}

		// Net worth

		let net_worth =
			parseInt($("#quiz-SAVEINCREASE").val()) +
			parseInt($("#quiz-RETIREINCREASE").val()) +
			parseInt($("#quiz-INVINCREASE").val()) +
			parseInt($("#quiz-DEBTPAIDNET").val()) +
			parseInt($("#quiz-NEWSALARY").val());

		array_target.append(returnInput("NETWORTH", net_worth));

		///
	});

	// handle app api call on submit

	if (window.location.href.indexOf("webflow.io") > -1) {
		var fetch_link =
			"https://us-central1-dashboard-boldermoney.cloudfunctions.net/saveQuizData/api/save";
		console.log("Development API Linked");
	} else {
		var fetch_link =
			"https://us-central1-getsetmoney-60d09.cloudfunctions.net/saveQuizData";
		console.log("Production API Linked");
	}

	$("#bold-form").submit(function () {
		var apiid = Math.floor(Math.random() * 1000000000);
		let email = $("#quiz-EMAIL").val();
		let aincome_submit = $("#quiz-ANNUIN").val();
		let debt_submit = $("#quiz-DEBTAMOUNT").val();
		let loans_input = $("#quiz-LOANS").val();
		let debt_number = $("#quiz-DEBTPAID").val();
		let debt_text = $("#quiz-DEBTTEXT").val();
		let retire_text = $("#quiz-RETIRE").val();
		let savings = $("#quiz-SAVE").val();
		let annual_income = $("#quiz-ANNUIN").val();
		let annual_income_text = $("#quiz-ANNUIN").val();
		let stress = $("#quiz-STRESS").val();
		let confident = $("#quiz-CONFIDENT").val();
		let emotion = $("#quiz-EMOTION").val();
		let goals = $("#quiz-GOALS").val();
		let name = $("#quiz-NAME").val();
		let salary = $("#quiz-NEWSALARY").val();
		let savings_increase = $("#quiz-SAVEINCREASE").val();
		let investment_increase = $("#quiz-INVINCREASE").val();
		let retirement_increase = $("#quiz-RETIREINCREASE").val();
		let debt_paid_off = $("#quiz-DEBTPAID").val();
		let debt_paid_off_text = $("#quiz-DEBTTEXT").val();
		let net_worth = $("#quiz-NETWORTH").val();
		let completed_quiz = "Yes";
		let age = $("#quiz-AGE").val();
		let relation_status = $("#quiz-RELATION").val();

		// POST to api
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			title: "Record of client",
			description: "This document records the submission of a client",
			data: {
				id: apiid,
				Email: email,
				Loans: loans_input,
				"Debt-number": debt_number,
				Debt_text: debt_text,
				Retirement: retire_text,
				Savings: savings,
				"Annual-Income": annual_income,
				"Annual-Income-Text": annual_income_text,
				Stress: stress,
				Confidence: confident,
				Emotion: emotion,
				Goals: goals,
				Name: name,
				Salary: salary,
				"Savings-Increase": savings_increase,
				"Investment-Increase": investment_increase,
				"Retirement-Increase": retirement_increase,
				"Debt-Paid-Off": debt_paid_off,
				"Debt-Paid-Off-Text": debt_paid_off_text,
				"Net-Worth": net_worth,
				"Completed-Quiz": completed_quiz,
				Age: age,
				"relation-Status": relation_status,
			},
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(fetch_link, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.then(() =>
				window.location.replace(
					`/your-potential?aincome=${
						parseInt(salary) * 10
					}&debt=${debt_submit}`
				)
			)
			.catch((error) => console.log("error", error));
	});

	// Last button submit

	$("#Quiz-Submit")
		.css({
			background: "#002f69",
			pointerEvents: "none",
			userSelect: "none",
		})
		.prop("disabled", true);

	$("#quiz-AGE, #quiz-EMAIL").keyup(function () {
		let age_val = $("#quiz-AGE").val();
		let email_val = $("#quiz-EMAIL").val();

		if (age_val != "" && email_val != "") {
			$("#Quiz-Submit")
				.css({
					background: "#ff791a",
					pointerEvents: "all",
				})
				.prop("disabled", false);
		} else {
			$("#Quiz-Submit")
				.css({
					background: "#002f69",
					pointerEvents: "none",
				})
				.prop("disabled", true);
		}
	});
