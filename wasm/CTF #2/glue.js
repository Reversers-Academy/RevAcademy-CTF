let exports;
(async () => {
  let wasmFile = await fetch("./new.wasm");
  let wasmObj = await WebAssembly.instantiate(await wasmFile.arrayBuffer());
  let wasmInstance = wasmObj.instance;
  exports = wasmInstance.exports;
})();

function onButtonPress() {
  let inputValue = document.getElementById("input").value;
  for (let i = 0; i < inputValue.length; i++) {
    exports.copy_char(inputValue.charCodeAt(i), i);
  }
  exports.copy_char(0, inputValue.length);
  if (exports.check_flag() == 1) {
    document.getElementById("result").innerHTML = "Correct!";
  } else {
    document.getElementById("result").innerHTML = "Incorrect!"; 
  }
}