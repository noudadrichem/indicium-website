var standardTypes = ["text", "email", "textarea"];
var numberTypes = ["number", "money", "percent", "range"];

$(document).ready(function() {

    $(".form-parent").each(function() {
        var formParent = $(this);
        var form = formParent.find("form[name='genericform']");

        form.submit(function(event) {
            if (form.attr("data-converted") !== "true") {
                event.preventDefault();
                convertData(formParent);
                form.attr("data-converted", "true");
                form.submit();
            }
        });
    });
});

function convertData(form) {
    var formData = {};

    $(".form-part").each(function() {
        var formPart = $(this);
        var type = formPart.attr("data-type");
        var name = formPart.attr("name");
        var val = formPart.val();

        if ($.inArray(type, standardTypes) !== -1) {
            formData[name] = val;
        } else if ($.inArray(type, numberTypes) !== -1) {
            formData[name] = parseFloat(val);
        } else if (type === "radio") {
            formPart.find("input").each(function() {
                if ($(this).is(":checked")) {
                    formData[name] = $(this).attr("value");
                }
            });
        } else if (type === "check") {
            if (formPart.is(":checked")) {
                formData[name] = "Ja";
            } else {
                formData[name] = "Nee";
            }
        }
    });

    form.find("textarea#genericform_json").val(JSON.stringify(formData));
}
