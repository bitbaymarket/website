var networkWeightInput = document.getElementById('networkWeightInput');
var networkWeightRange = document.getElementById('networkWeightRange');
var coinAmountText = document.getElementById('coinAmountText');
var coinAmountRange = document.getElementById('coinAmountRange');
var coinAmountInput = document.getElementById('coinAmountInput');

// Months Slider
jQuery(function ($) {
    
//Input Range Slider
// Amount to Stake
$(coinAmountText).text(parseFloat($(coinAmountRange).val()));
$(coinAmountInput).val(parseFloat($(coinAmountRange).val()));

$(coinAmountRange).on('input change', function() {
    $(coinAmountInput).val(parseInt($(this).val())); 
    calculateStake();
});
$(coinAmountInput).on('input change', function(e) {
    //console.log('coinAmountInput: '+ this.value);
    $(coinAmountRange).val(this.value);
    $(coinAmountRange).trigger('input');
});

//Network WeightcalculateStake
$(networkWeightRange).on('input change', function () {
    var NetworkValue = parseInt($(this).val());
    //console.log('networkWeightRange: ' + NetworkValue);
    $(networkWeightInput).val(NetworkValue);
    calculateStake();
});
$(networkWeightInput).on('input change', function(e) {
    //console.log('networkWeightInput: '+ this.value);
    $(networkWeightRange).val(this.value);
    $(networkWeightRange).trigger('input');
    
});


// Gradient Progress Bar
$('input[type=range]').on('input', function(e){
  var min = e.target.min,
      max = e.target.max,
      val = e.target.value;

      //console.log('e target: ', e);
  
  $(e.target).css({
    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
  });
    //console.log('coinAmountInput.value: ' + coinAmountInput.value);
    //console.log('networkWeightInput.value: ' + networkWeightInput.value);
    
  //console.log('stakeConversion.val: ' , stakeConversion);

}).trigger('input');


//const formatThousand1 = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

function formatThousand(numToFormat) {
    return String(numToFormat).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');
}

function calculateStake() {
    

    var result = '';
    var stakeValue = 20;   //default

    if(document.querySelector('.dropdown.selectDropdown > span') !== null){
        stakeValue = document.querySelector('.dropdown.selectDropdown > span').textContent.trim();
        console.log('not null');
    }else{
        console.log('null');
    }

/*
 if(stakeValue.includes('20'))
        stakeValue = 20;
    if(stakeValue.includes('5'))
        stakeValue = 5;
    if(stakeValue.includes('10'))
        stakeValue = 10;
    if(stakeValue.includes('40'))
        stakeValue = 40;

*/

    if(stakeValue == 'Frozen reserve20 coin reward')
        stakeValue = 20;
    if(stakeValue == 'Majority liquid5 coin reward')
        stakeValue = 5;
    if(stakeValue == 'Majority reserve10 coin reward')
        stakeValue = 10;
    if(stakeValue == 'Frozen liquid40 coin reward')
        stakeValue = 40;

    console.log('stakeValue: ' + stakeValue);
    console.log('coinAmountInput.value: ' + coinAmountInput.value);
    console.log('networkWeightInput.value: ' + networkWeightInput.value);

    var amount = coinAmountInput.value;
    var weight = networkWeightInput.value;
        //493087 blocks in a year (seconds/average block time of 64 seconds)
    var stakedcoins = ((parseFloat(1000000000) * parseFloat(weight)) / parseFloat(100));
    var perc = (parseFloat(amount) / stakedcoins);
    if (perc > 1) {
        perc = 1;
    }
    var blocksperyear = (perc * (493087)).toFixed(0)
    result += "Estimate:" + blocksperyear;
    result += "</br>Blocks won per year: " + blocksperyear;
    result += "</br>Coins per year: " + blocksperyear * stakeValue;
    result += "</br>Coins per month: " + (parseFloat(blocksperyear * stakeValue) / parseFloat(12)).toFixed(0);
    result += "</br>Coins per day: " + ((parseFloat(blocksperyear * stakeValue) / parseFloat(12)) / parseFloat(30)).toFixed(0);

    var stakeDay = ((parseFloat(blocksperyear * stakeValue) / parseFloat(12)) / parseFloat(30)).toFixed(0);
    var stakeMonth = (parseFloat(blocksperyear * stakeValue) / parseFloat(12)).toFixed(0);
    var stakeYear = blocksperyear * stakeValue;

    document.querySelector('.stake-per-day').innerText = formatThousand(stakeDay);
    document.querySelector('.stake-per-month').innerText = formatThousand(stakeMonth);
    document.querySelector('.stake-per-year').innerText = formatThousand(stakeYear);
    document.querySelector('.stake-block-estimate').innerText = formatThousand(blocksperyear);
    
    console.log('result: ' + result);
}



/*select dropdown*/
$("select.dropdown").each(function () {
    var dropdown = $("<div />").addClass("dropdown selectDropdown");

    $(this).wrap(dropdown);

    var label = $("<span />")
        .text($(this).attr("placeholder"))
        .insertAfter($(this));
    var list = $("<ul />");

    $(this)
        .find("option")
        .each(function () {
            var option = $(this).text().split(' - ');
            var suboption = option[1];
            if(option[0] == 'Frozen reserve')
            suboption += ' (most common)';

            //console.log('option: '+  option[0] );
            //console.log('suboption: '+  suboption );
            list.append($("<li />").append($("<a />").html( option[0] + '<small>'+suboption+'</small>' )));
            //list.append($("<li />").append($("<a />").text($(this).text())).append( $("<small />").text(suboption)) );
            //+ '<small>'+suboption+'</small>'
        });

    list.insertAfter($(this));

    if ($(this).find("option:selected").length) {
        //console.log('testar ' + $(this).find("option:selected").text());
        var new_label = $(this).find("option:selected").text().split(' - ');
        label.html(new_label[0] + '<small>'+new_label[1]+'</small>');
        list.find(
            //"li:contains(" + $(this).find("option:selected").text() + ")"
            "li:contains(" + $(this).find("option:selected").text() + ")"
        ).addClass("active");
        $(this).parent().addClass("filled");
    }
});

$(document).on("click touch", ".selectDropdown ul li a", function (e) {
    e.preventDefault();
    var dropdown = $(this).parent().parent().parent();
    var active = $(this).parent().hasClass("active");
    /*var label = active
        ? dropdown.find("select").attr("placeholder")
        : $(this).text();
        */
    var label_sub = $(this)[0].lastChild.innerText;    //fetch content within <small>
    label_sub = label_sub.split('(')[0];

    
    //console.log('$(this): ', $(this)[0].innerHTML.split('<')[0]);
    console.log('$(this) small: ', label_sub);
    //var label = $(this).text();
    var label = $(this)[0].innerHTML.split('<')[0];
    console.log('label: ', label);



    //dropdown.find("option").prop("selected", false);
    dropdown.find("ul li").removeClass("active");

    //dropdown.toggleClass("filled", !active);
    dropdown.children("span").html(label + '<small>' +label_sub+ '</small>');

   
    
    //if (!active) {
        dropdown.find("option:contains(" + $(this).text() + ")").prop("selected", true);
        $(this).parent().addClass("active");
    //}
    

    dropdown.removeClass("open");

    calculateStake();
});

$(".dropdown > span").on("click touch", function (e) {
    var self = $(this).parent();
    self.toggleClass("open");
});

$(document).on("click touch", function (e) {
    var dropdown = $(".dropdown");
    if (dropdown !== e.target && !dropdown.has(e.target).length) {
        dropdown.removeClass("open");
    }
});


/*
document.getElementById('coinAmountInput').addEventListener('keyup', function (evt) {
    
    console.log('val: '+ this.value);
    $(coinAmountRange).val(this.value);
});
*/

document.getElementById('coinAmountInput').value = 0;
document.getElementById('networkWeightInput').value = 50;

// light
$(".switch input").on("change", function (e) {
    $(".dropdown, body").toggleClass("light", $(this).is(":checked"));
});


});