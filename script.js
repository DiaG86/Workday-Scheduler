

$(document).ready(function() {
  
  
    // get times from moment
    var now = moment().format('MMMM Do YYYY');
  
    // commented out for test in non-standard hours
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
    $(currentDay).text(now);


  
    // Get stored todos from localStorage
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
     // If plans were retrieved from localStorage, update the plan array to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else { planTextArr = new Array(9);}
    
    // set variable referencing planner element
    var $plannerDiv = $('#planner');
    // clear existing elements
    $plannerDiv.empty();

  
    // create rows for hours between 8 and 5
    for (var hour = 8; hour <= 17; hour++) {
      // index for array use offset from hour
      var index = hour - 8;
      
 
      var $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
    
      var $TimeDiv = $('<div>');
      $TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      var $timeBox = $('<span>');
      // can use this to get value
      $timeBox.attr('class','timeBox');
      
      // format hours for display
      var displayHour = 0;
      var ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // populate timeBox with time
      $timeBox.text(`${displayHour} ${ampm}`);
  
      // insert into col inset into timebox
      $rowDiv.append($TimeDiv);
      $TimeDiv.append($timeBox);
   
      // build row components
      var $daily = $('<input>');
  
      $daily.attr('id',`input-${index}`);
      $daily.attr('hour-index',index);
      $daily.attr('type','text');
      $daily.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $daily.val( planTextArr[index] );
      
      // create col to control width
      var $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-6');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($daily);
     
      var $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      var $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
    
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // STOP building save portion of row
      
      // add row to planner container
      $plannerDiv.append($rowDiv);
    };
  

    // saves to local storage
    // onclick function
    $(document).on('click','i', function(event) {
      event.preventDefault(); 

  
      var $index = $(this).attr('save-id');
  
      var inputId = '#input-'+$index;
      var $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  

  
    
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    

    $(document).on('change','input', function(event) {
      event.preventDefault();  
   
      var i = $(this).attr('hour-index');
  
    });
  });