$(document).ready(function() {

    var getFunctionByName = function(functionName, context /*, args */) {
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func];
    };

    var prepareConfig = function(config)
    {
        var callbackList = ['fileUploadErrorCallback', 'imageUploadErrorCallback', 'fileUploadCallback', 'imageUploadCallback'];
        for (var i = 0; i < callbackList.length; i++) {
            var callbackName = callbackList[i];
            if (config[callbackName]) {
                config[callbackName] = getFunctionByName(config[callbackName], window);
            }
        }
		if (config.buttonsCustom) {
			for (var i in config.buttonsCustom) {
				if (config.buttonsCustom[i])  {
					var button = config.buttonsCustom[i];
					if (button.callback) {
						button.callback = getFunctionByName(button.callback, window);
					}
					if (button.dropdown) {
						for (var j in button.dropdown) {
							var item = button.dropdown[j];
							if (item.callback) {
								item.callback = getFunctionByName(item.callback, window);
							}
						}
					}
					if (button.configureCallback) {
						var configureCallback = getFunctionByName(button.configureCallback, window);
						if (configureCallback) {
							configureCallback(button);
						}
					}
				}
			}
		}
    };

    for (var redactorId in configRedactor) {
        var config = configRedactor[redactorId];
        prepareConfig(config);
        $("#" + redactorId).redactor(config);
    }

});

window.redactorErrorUploadFile = function(obj, json)
{
    alert(json.message);
};

window.redactorUploadFile = function(obj, json)
{

};