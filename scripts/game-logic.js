//game logic starts here

$(document).ready(function () {
 
    function randomFromInterval(from,to)
		{
    		return Math.floor(Math.random()*(to-from+1)+from);
		}


      var visibleImage;
      var outofGameDivs = {};

      startMatching = function(){
        var eventDivId = event.target.id ? event.target.id : event.target.parentElement.id;
        var eventDiv = document.getElementById(eventDivId);
        if(visibleImage === undefined){
          console.log("no image displayed now");
          if(eventDiv.children[0]){
          eventDiv.children[0].style.visibility = "visible";
          visibleImage = eventDiv.children[0];
        }
        }
        else{
          if(outofGameDivs.hasOwnProperty(eventDivId)){
            return;
          }
          eventDiv.children[0].style.visibility = "visible";
          if(eventDiv.children[0].src === visibleImage.src && eventDiv.id !== visibleImage.parentElement.id){
            outofGameDivs[visibleImage.parentElement.id] = "out of game";
            outofGameDivs[eventDivId] = "out of game";
            visibleImage = undefined;
            var totalImageMatched = 0;
            for(var key in outofGameDivs)
            {
              totalImageMatched++;
            }
            if(totalImageMatched === numberofTiles){
              var action=confirm("Good Job .. Would you like to play again ?");
                if (action==true)
                  {
                    window.location.reload();
                  }
                else
                  {                    
                    $('#gameMessage').text("Hurray !! you won buddy..");
                  }
            }
            else{
              $('#gameMessage').text("Hurray !! you got a match..");
              setTimeout(function(){
                $('#gameMessage').text("Click on any tile to unfold");
              },5000);
            }
          }
          else{
            eventDiv.children[0].style.visibility = "hidden";
            visibleImage.style.visibility = "hidden";
            visibleImage = undefined;
            $('#gameMessage').text("Aww !! wrong choice..");
            setTimeout(function(){
              $('#gameMessage').text("Click on any tile to unfold");
            },3000);
          }
        }
      }



	var numberofTiles = 2 * randomFromInterval(6,12);
	console.log(numberofTiles);

	var imageArray = [];
	var gameTilesImages = [];
	gameTilesImages.length = numberofTiles;


  // code logic to fill images randomly into tiles

  setImagesToTiles = function() {

	  for(var i =0; i<numberofTiles/2; i++){
    imageArray[i] = new Image();
    imageArray[i].onload = function(i,event) {

            if (i === ((numberofTiles/2 )- 1))
      {
        console.log(imageArray);
        for(var j = 0;j<imageArray.length; j++){
          var imagePushed = 1;
          function pushImageToArray(position){
            if(gameTilesImages[position] === undefined){
              gameTilesImages[position] = imageArray[j].src;      

              $("#imgcell_"+ position)[0].src = gameTilesImages[position];

              imagePushed++;
              if(imagePushed>2){
                return;
              }
              else {
                var newPosition = randomFromInterval(0,numberofTiles-1);
                pushImageToArray(newPosition);
              }
            }
            else{
              var newPosition = randomFromInterval(0,numberofTiles-1);
              pushImageToArray(newPosition);
            }
          }
          pushImageToArray(j);
            console.log(gameTilesImages);
        }

      }
    }.bind(null, i);

    imageArray[i].onerror = function() {
      alert("not loaded");
    }

    imageArray[i].src = './images/default_' + i +'.png';

  	}

  }

  setImagesToTiles();
	

	var numberOfDiv = 0;
	if (numberofTiles % 3 === 0)
		numberOfDiv = numberofTiles/3;
	else
		numberOfDiv = (numberofTiles/3) + 1;


	function generateGrid(){
	  var cellCount = 0;
      for (var i = 0; i < numberOfDiv; i++) {
        var rowDivId = "row_" + i;
        jQuery('<div/>', {
          id: rowDivId,
          css: {
            "width": "150px",
            "height": "50px",
            "display": "table-row"
          }
        }).appendTo('#content');

        for (var j = 0; j < 3; j++) {
        	if(cellCount>=numberofTiles){
        		return;
        	}
          var cellDivId = "cell_" + cellCount;
          cellCount++;
          jQuery('<div/>', {
            id: cellDivId,
            css: {
              "width": "50px",
              "height": "50px",
              "border": "1px solid grey",
              "display": "table-cell",
              "innerHTML": "<img></img>"
            }
          }).appendTo('#' + rowDivId);

          $('#' + cellDivId).append("<img id='img"+ cellDivId +"' style='visibility: hidden'/>")

          $('#' + cellDivId).click(function(){
			        startMatching();
			    })
        }
      }
	}
	generateGrid();

    });
   