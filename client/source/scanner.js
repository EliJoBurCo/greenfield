import Quagga from 'quagga';

// let Scanner = {
//   init: function() {
//     console.log('scanner app')
//   }
// }

export default function Scanner () {
  var App = {
    init: function() {
      Quagga.init(Scanner.state, function(err) {
        if (err) {
          console.log(err)
          return
        }
        Quagga.start();
      });
    },
    state: {
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: {min: 640}, //Not sure on this
          height: {min: 480}, //Same here
          facingMode: 'environment',
          aspectRatio: {min: 1, max: 2}
        }
      },
      locator: {
        patchSize: 'large',
        halfSample: false
      },
      decoder: {
        readers: [{format: 'ean_reader', config: {}}] //maybe add , config: {}
      },
      locate: true
    }
  }

  App.init();

  Quagga.onProcessed(function(result) {
    var drawingCtx = Quagga.canvas.ctx.overlay;
    var drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
        result.boxes.filter(function (box) {
            return box !== result.box;
        }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
      }
    }
  });

  Quagga.onDetected(function(result){
    console.log('result------------>', result.codeResult.code);

    Quagga.offDetected();
    Quagga.offProcessed();
    Quagga.stop();
  });
}

// export{Scanner}
