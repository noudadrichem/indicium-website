$("document").ready(function () {
    var envUrl = "https://indicium.hugit add * /";

    $(function () {

        $('.calendar-element').fullCalendar({
            defaultView: 'month',
            displayEventTime: false,

            header: {
                center: 'addEventButton'
            },

            events: function (start, end, timezone, callback) {
                start = start.format("YYYY-MM-DD");
                end = end.format("YYYY-MM-DD");

                console.log(start);
                console.log(end);

                $.ajax({
                    url: envUrl + "json/events?&filter[start]%3C" + end + "&filter[end]=%3E" + start,
                    success: function (response) {
                        console.log(response);

                        events = response.data;

                        const fetchedEvents = events.map(function (event) {
                            console.log(event);
                            const eventObj = {
                                title: event.attributes.title,
                                start: event.attributes.start,
                                end: event.attributes.end,
                                url: "evenement/" + event.attributes.slug,
                                id: event.id,
                                allday: true
                            };
                            return eventObj
                        });

                        console.log(fetchedEvents);

                        callback(fetchedEvents);
                    }
                });
            },

            customButtons: {
            }
        });

    });
});


// $("document").ready(function () {
//     var envUrl = "http://localhost:8888/indicium.hu/website/public_html/";
//
//     $(function () {
//         $('[data-toggle="tooltip"]').tooltip();
//
//
//         function initializeCalendar() {
//             var apiUrl = envUrl + "json/events?&filter[start]%3C2018-12-09&filter[end]=%3E2018-10-28";
//             var events = [];
//
//             $.getJSON(apiUrl, function (response) {
//
//                 var events = response.data;
//
//
//                 const fetchedEvents = events.map(function (event) {
//                     console.log(event);
//                     const eventObj = {
//                         title: event.attributes.title,
//                         start: event.attributes.start,
//                         end: event.attributes.end,
//                         url: event.attributes.url,
//                         id: event.id
//                     };
//                     return eventObj
//                 });
//
//
//                 $('.calendar-element').fullCalendar({
//                     defaultView: 'month',
//                     header: {
//                         center: 'addEventButton'
//                     },
//                     events: fetchedEvents,
//                     customButtons: {
//                         addEventButton: {
//                             text: 'add event...',
//                             click: function () {
//                                 var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//                                 var date = moment(dateStr);
//
//                                 if (date.isValid()) {
//                                     $('.calendar-element').fullCalendar('renderEvent', {
//                                         title: 'dynamic event',
//                                         start: date,
//                                         allDay: true
//                                     });
//                                     alert(date);
//                                     alert('Great. Now, update your database...');
//                                 } else {
//                                     alert('Invalid date.');
//                                 }
//                             }
//                         }
//                     }
//                 });
//             })
//         }
//
//         initializeCalendar()
//
//     });
// });
