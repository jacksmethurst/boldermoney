	$( "#Name-Input" ).keyup(function() {
    var value = $( this ).val();
    $( "#Name-Output" ).text( value );
    $('#push-name').val(value);
  });
  
$('#completed-quiz').val('true');

$('.goal-check').click(function(){
  
   $(this).parent().toggleClass('active');
  
  let goals_wrap = $('#goals_wrap > label.active');
  let all_goals = [];
  
    goals_wrap.each(function(){

      let goal_value = $(this).find('input').data("goal");
      
      all_goals.push(goal_value);

    });
  
  let all_goals_string = all_goals.toString();
  let all_goals_format = all_goals_string.replaceAll(',',' / ');
  
  let push_goal = $('#push-goals');
  
  push_goal.val(all_goals_format);
  
});

$('.emotion-check').find('img').css('pointer-events','none');

$('.emotion-check').click(function(){
  
   let push_emotion = $('#push-emotion');
   let current_emotion = $(this).find('input').data("emotion");
  
  push_emotion.val(current_emotion);
  
});

$('.confidence-check').find('span').css('pointer-events','none');

$('.confidence-check').click(function(){
  
   let push_confident = $('#push-confident');
   let current_confident = $(this).find('input').data("confident");
  
  push_confident.val(current_confident);
  
});

$('.stress-check').find('span').css('pointer-events','none');

$('.stress-check').click(function(){
  
   let push_stress = $('#push-stress');
   let current_stress = $(this).find('input').data("stress");
  
  push_stress.val(current_stress);
  
});

$('.annual-check').click(function(){
  
   let push_annual = $('#push-annual');
   let push_annual_text = $('#push-annual-text');
   let current_annual = $(this).find('input').val();
   let current_annual_text = $(this).find('span').text();
  
  push_annual.val(current_annual);
  push_annual_text.val(current_annual_text);
  
});

// Savings

$('.savings-check').click(function(){
  
   let push_savings = $('#push-savings');
   let push_savings_text = $('#push-savings-text');
   let current_savings = $(this).find('input').val();
   let current_savings_text = $(this).find('span').text();
   
  push_savings_text.val(current_savings_text);
  
});

// Retirement

$('.retirement-check').click(function(){
  
   let push_retirement = $('#push-retirement');
   let push_retirement_text = $('#push-retirement-text');
   let current_retirement = $(this).find('input').val();
   let current_retirement_text = $(this).find('span').text();
   
  push_retirement_text.val(current_retirement_text);
  
});

// Debt

$('.debt-check').click(function(){
  
   let push_debt = $('#push-debt');
   let push_debt_text = $('#push-debt-text');
   let current_debt = $(this).find('input').val();
   let current_debt_text = $(this).find('span').text();
  
  push_debt.val(current_debt);
  push_debt_text.val(current_debt_text);
  
});

// Loans

$('.loan-check').click(function(){
  
   $(this).parent().toggleClass('active');
  
  let loans_wrap = $('#loans_wrap > label.active');
  let all_loans = [];
  
    loans_wrap.each(function(){

      let loan_value = $(this).find('input').data("loan");
      
      all_loans.push(loan_value);

    });
  
  let all_loans_string = all_loans.toString();
  let all_loans_format = all_loans_string.replaceAll(',',' / ');
  
  console.log(all_loans_format);
  
  let push_loan = $('#push-loans');
  
  push_loan.val(all_loans_format);
  
});

// redirect


  $('#bold-form').submit(function() {
  
    
    let email = $('#EMAIL-2').val();
    let aincome_submit = $('#push-annual').val();
    let loans_input = $('#push-loans').val();
    let debt_number = $('#push-debt').val();
    let debt_text = $('#push-debt-text').val();
    let retire_text = $('#push-retirement-text').val();
    let savings = $('#push-savings-text').val();
    let annual_income = $('#push-annual').val();
    let annual_income_text = $('#push-annual-text').val();
    let stress = $('#push-confident').val();
    
    let confident = $('#push-stress').val();
    let emotion = $('#push-emotion').val();
    let goals = $('#push-goals').val();
    let name = $('#push-name').val();
    let salary = $('#push-new-salary').val();
    let savings_increase = $('#push-savings-increase').val();
    let investment_increase = $('#push-investment-increase').val();
    let retirement_increase = $('#push-retirement-increase').val();
    let debt_paid_off = $('#push-debt-paid-off').val();
    let debt_paid_off_text = $('#push-debt-paid-off-text').val();
    let net_worth = $('#push-net-worth').val();
    let completed_quiz = $('#completed-quiz').val();
    let age = $('#AGE-3').val();
    let relation_status = $('#RELATION').val();
  
  	var apiid = Math.floor(Math.random() * 1000000000);
  	// POST to api
  	var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "title": "Record of client",
      "description": "This document records the submission of a client",
      "data": {
        id: apiid,
        Email: email,
        Loans: loans_input,
        "Debt-number": debt_number,
        "Debt_text": debt_text,
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
        "relation-Status": relation_status
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://us-central1-dashboard-boldermoney.cloudfunctions.net/saveQuizData/api/save", requestOptions)
      .then(response => response.text())
      .then((result) => console.log(result))
      .then(() => window.location.replace(`/your-potential?aincome=${aincome_submit}&debt=${debt_submit}`))
      .catch(error => console.log('error', error));

  });
$( "#Annual-Income-Input" )
  .keyup(function() {
    var value = Number($( this ).val());
    var calc = value + value*10/100;
    const formattedSum = new Intl.NumberFormat().format(calc);
    $( "#Annual-Income-Output" ).text( formattedSum );
  })
  .keyup();
  
var Webflow = Webflow || [];
Webflow.push(function() {
  var l = $('#quiz-slider .w-slider-arrow-left');
  var r = $('#quiz-slider .w-slider-arrow-right');
  $('#quiz-slider')
    .on('click', '.slider-left', function() {
      l.trigger('tap');
    })
    .on('click', '.slider-right', function() {
      r.trigger('tap');
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

$('#quiz-calculate').click(function(){
  
  var push_new_salary = $('#push-new-salary');
  var push_savings_increase = $('#push-savings-increase');
  var push_investment_increase = $('#push-investment-increase');
  var push_retirement_increase = $('#push-retirement-increase');
  var push_debt_paid_off = $('#push-debt-paid-off');
  var push_debt_paid_off_text = $('#push-debt-paid-off-text');
  var push_net_worth = $('#push-net-worth');
  
  var aincome = $('#push-annual').val();
  var debt = $('#push-debt').val();
  
  // Salaries

  if (aincome < 50000) {
    var new_salary = 4000;
  } else if (aincome >= 51000 && aincome <= 100000) {
    var new_salary = 6000;
  } else if (aincome >= 101000 && aincome <= 150000) {
    var new_salary = 12500;
  } else if (aincome >= 151000 && aincome <= 200000) {
    var new_salary = 14500;
  } else if (aincome > 200000) {
    var new_salary = 21000;
  }
  
  push_new_salary.val(new_salary.toFixed(0));

  // Investments Increase

  if (aincome < 50000) {
    var investment_increase = 0.0351 * 25000;
  } else if (aincome >= 51000 && aincome <= 100000) {
    var investment_increase = 0.0702 * 51000;
  } else if (aincome >= 101000 && aincome <= 150000) {
    var investment_increase = 0.0702 * 101000;
  } else if (aincome >= 151000 && aincome <= 200000) {
    var investment_increase = 0.0702 * 151000;
  } else if (aincome > 200000) {
    var investment_increase = 0.0702 * 201000;
  }
  
  push_investment_increase.val(investment_increase.toFixed(0));

  // Savings Increase

  if (aincome < 50000) {
    var savings_increase = 0.0975 * 25000;
  } else if (aincome >= 51000 && aincome <= 100000) {
    var savings_increase = 0.1625 * 51000;
  } else if (aincome >= 101000 && aincome <= 150000) {
    var savings_increase = 0.1625 * 101000;
  } else if (aincome >= 151000 && aincome <= 200000) {
    var savings_increase = 0.1625 * 151000;
  } else if (aincome > 200000) {
    var savings_increase = 0.1625 * 201000;
  }
  
  push_savings_increase.val(savings_increase.toFixed(0));

  // Retirement Increase

  if (aincome < 50000) {
    var retirement_increase = 0.108 * 25000;
  } else if (aincome >= 51000 && aincome <= 100000) {
    var retirement_increase = 0.162 * 51000;
  } else if (aincome >= 101000 && aincome <= 150000) {
    var retirement_increase = 19500;
  } else if (aincome >= 151000 && aincome <= 200000) {
    var retirement_increase = 19500;
  } else if (aincome > 200000) {
    var retirement_increase = 19500;
  }
  
  push_retirement_increase.val(retirement_increase.toFixed(0));

  // Debt paid off

if (debt < 5000) {
  var debt_text = "All";
  var debt_paid_off = 4000;
  var debt_paid_off_net = 5000;
} else if (debt >= 5000 && debt < 10000) {
  var debt_text = "Most";
  var debt_paid_off = 7500;
  var debt_paid_off_net = 7500;
} else if (debt >= 10000 && debt < 25000) {
  var debt_text = "Most";
  var debt_paid_off = 11000;
  var debt_paid_off_net = 11000;
} else if (debt >= 25000) {
  var debt_text = "More than half";
  var debt_paid_off = 25000;
  var debt_paid_off_net = 18000;
}
  
  push_debt_paid_off.val(debt_paid_off.toFixed(0));
  push_debt_paid_off_text.val(debt_text);
  
  // Net worth

  let net_worth =
    savings_increase +
    retirement_increase +
    investment_increase +
    debt_paid_off_net +
    new_salary;
  
  push_net_worth.val(net_worth.toFixed(0));
  
});

var styleTag = $(
  "<style>.bolder_disabled { opacity: 0.2 !important; cursor: no-drop; }</style>"
);
$("html > head").append(styleTag);

$(".quiz-mask > .quiz-slide").each(function () {
  if (
    $(this).find("input").length ||
    $(this).find("#goals_wrap").length ||
    $(this).find(".radio_wrap").length
  ) {
    $(this)
      .find("a.slider-right")
      .addClass("bolder_disabled")
      .prop("disabled", true);
  }
});

$(".quiz-slide-wrap input").keyup(function () {
  if ($(this).val() != "") {
    $(this)
      .closest(".quiz-slide-wrap")
      .find("a.slider-right")
      .removeClass("bolder_disabled")
      .prop("disabled", false);
  } else {
    $(this)
      .closest(".quiz-slide-wrap")
      .find("a.slider-right")
      .addClass("bolder_disabled")
      .prop("disabled", true);
  }
});

$(
  ".quiz-slide-wrap #goals_wrap label, .quiz-slide-wrap #loans_wrap label"
).click(function () {
  let goals_amount = $(this).parent().find(".active").length;

  console.log(goals_amount);

  if (goals_amount > 0) {
    $(this)
      .closest(".quiz-slide-wrap")
      .find("a.slider-right")
      .removeClass("bolder_disabled")
      .prop("disabled", false);
  } else {
    $(this)
      .closest(".quiz-slide-wrap")
      .find("a.slider-right")
      .addClass("bolder_disabled")
      .prop("disabled", true);
  }
});

$(".radio-wrap > label, .radio-wrap-alt > label").click(function () {
  $(this)
    .closest(".quiz-slide-wrap")
    .find("a.slider-right")
    .removeClass("bolder_disabled")
    .prop("disabled", false);
});

$("#Quiz-Submit").addClass("bolder_disabled").prop("disabled", true);

$("#AGE-3, #EMAIL-2").keyup(function () {
  let age_val = $("#AGE-3").val();
  let email_val = $("#EMAIL-2").val();

  if (age_val != "" && email_val != "") {
    $("#Quiz-Submit").removeClass("bolder_disabled").prop("disabled", false);
  } else {
    $("#Quiz-Submit").addClass("bolder_disabled").prop("disabled", true);
  }
});
