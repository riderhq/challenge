$(document).ready(
        function() {
            /*sliding panel with extra info:*/
            $( "#moredetails" ).hide();

            /*call API and fetch some JSON data*/
            $.ajax({
              url: "https://www.riderhq.com/api/v1/3489/getevent?eventid=2ei1p7"
              , dataType: "json" //sets accept header which puts api in 'live' mode where it just sends back json and not the surrounding html / info
            }).done(function(json) {
            /*Got some data - we'll only handle the 'happy path' here, since it's a demo...
             So plug in our 'variable' data to the html 'template'
            */
              if(json.event.image_uri.length>0) $( "#img" ).html("<img style='max-width:200px;' src='"+json.event.image_uri+"'/>");
              $( ".title" ).text(json.event.name);
              $( "a.enterbutton" ).attr("href",json.event.enter_uri);
              $( ".startdate" ).text(moment(json.event.start_date).format("dddd Do MMMM YYYY"));
              $( ".starttime" ).text(moment(json.event.start_date).format("h:mma"));
              $( ".cat" ).text(json.event.category_description);
              $( ".dist" ).text(json.event.distance_time_description);
              $( ".location" ).html(json.event.location_address.replace(/\r\n/g, '<br/>'));
              $( ".location" ).append(" "+json.event.location_postcode); //could use this postcode to display a googlemap of the location somewhere... perhaps another time?
              $( "#desc" ).html(json.event.organiser_description_html);
              /*There could be more than one 'entrylist' for an event, in which case f we would lay out a table of list of
               options (name, cost, etc.) and perhaps let the user select on (and update the 'enter now' buttons href attibute)
               But this event happens to have only one, so for simplicity's sake, because it's a demo, we'll just assume knowledge of that.
              */
              var cost=json.event.entrylists[0].fees[0].amount;
              $( "#fee" ).text(cost>0?"£"+cost:"Free!");
              var waiting=json.event.entrylists[0].waiting_list_count;
              $( "#waiting" ).text(waiting);
              $( "#max" ).text(json.event.entrylists[0].max_entries);
            });

            /*somewhat pointless animation, but why not?*/
            $( "#showmore" ).click(function() {
                    // some effects have required parameters
                    var vis=!$( "#moredetails" ).is(":visible");
                    if(vis){
                      $( "#moredetails" ).show( "blind", {}, 500, $( "#showmore" ).html("<span class='glyphicon glyphicon-chevron-up' aria-hidden='true'></span> &nbsp;Hide details") );
                    }
                    else{
                      $( "#moredetails" ).hide( "blind", {}, 500, $( "#showmore" ).html("<span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span> &nbsp;More details") );
                    }
                });
        });

