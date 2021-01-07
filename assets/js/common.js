//加法
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }

  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

  m = Math.pow(10, Math.max(r1, r2));
  return (accMul(arg1, m) + accMul(m, arg2)) / m
}

function accMul (arg1, arg2) {
  var m = 0, s1 = arg1 + "", s2 = arg2 + "";
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function getLocalTime(time) {
  var now = new Date(time);
  var year = now.getFullYear();
  var month = (now.getMonth() + 1) .toString().padStart(2 ,0);
  var date = now.getDate().toString().padStart(2 ,0);
  var hour = now.getHours().toString().padStart(2 ,0);
  var minute = now.getMinutes().toString().padStart(2 ,0);
  var second = now.getSeconds().toString().padStart(2 ,0);

  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

export {
  accAdd, accMul, getLocalTime
}
