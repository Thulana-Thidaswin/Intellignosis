
function getParams() 
{var idx = document.URL.indexOf('?'); 
var params = new Array(); 
if (idx != -1)  
{var pairs = document.URL.substring(idx+1, document.URL.length).split('&'); 
for (var i=0; i<pairs.length; i++){nameVal = pairs[i].split('='); 
params[nameVal[0]] = nameVal[1];}} 
return params;}params = getParams(); 
PatientName = unescape(params["patientName"]); 
document.write("PatientName = " + PatientName + "<br>"); 
