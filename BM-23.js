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
				`<input style="color: #000;" type="text" name="quiz-${item.name}" placeholder="${item.name}" value="${item.value}"></input>`
			);
		});
	});

	// Handle submit

	$("#bold-form").submit(function (e) {
		e.preventDefault();

		console.log("form submitted");

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: "jack@newgenre.studio",
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://hooks.zapier.com/hooks/catch/9970856/bj9s83j/",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	});
