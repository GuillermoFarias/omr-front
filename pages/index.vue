<script setup>
const video = ref(document.createElement("video"));
const canvas = ref(document.createElement("canvas"));
const canvasResult = ref(document.createElement("canvas"));
const running = ref(false);
const lookinForDocument = ref(null);
const scanner = ref(new jscanify());
const acceptablePercentage = 95;
const scannedPercentage = ref(0);
const probableDocuments = {
  A4: { width: 210, height: 297 },
  Letter: { width: 8.5 * 25.4, height: 11 * 25.4 }, // Convertir pulgadas a milímetros
  // Agrega más documentos según sea necesario
};
const photo = ref(false);
const isDocument = ref(false);

const openCamera = () => {
  const constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      running.value = true;
      setTimeout(() => {
        handleVideoStream(stream);
      }, 200);
    })
    .catch((error) => {
      console.error("Error al acceder a la cámara: ", error);
    });
};

const closeCamera = () => {
  if (video.value) {
    video.value.pause(); // Detener el video
    running.value = false;
    cancelSearch();
    const tracks = video.value.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop()); // Detener las pistas de la cámara
    }
  }
};

const handleVideoStream = (stream) => {
  const canvasCtx = canvas.value.getContext("2d");
  canvasCtx.imageSmoothingEnabled = false;
  canvasCtx.imageSmoothingQuality = "high";
  video.value.srcObject = stream;
  video.value.onloadedmetadata = () => {
    video.value.play();

    canvas.value.width = video.value.videoWidth * 0.5;
    canvas.value.height = video.value.videoHeight * 0.5;

    const drawFrame = () => {
      canvasCtx.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      const resultCanvas = scanner.value.highlightPaper(canvas.value, {
        color: "green",
        thickness: 4,
      });
      canvasCtx.drawImage(
        resultCanvas,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
    searchDocument();
  };
};

const downloadImage = () => {
  const link = document.createElement("a");
  link.href = photo.value;
  link.download = "quizpilot" + Date.now() + ".png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const takePicture = () => {
  if (!canvas.value) return;

  const contour = scanner.value.findPaperContour(cv.imread(canvas.value));
  const cornerPoints = scanner.value.getCornerPoints(contour);
  const dimensions = calculateDimensions(cornerPoints);
  const width = dimensions.width * 5;
  const height = dimensions.height * 5;
  const result = scanner.value.extractPaper(canvas.value, width, height);
  photo.value = result.toDataURL("image/png");
  running.value = false;
  cancelSearch();
  // const enlaceDescarga = document.createElement("a");

  // enlaceDescarga.href = urlImagen;
  // enlaceDescarga.download = "miImagen.png";
  // document.body.appendChild(enlaceDescarga);
  // enlaceDescarga.click();
  // document.body.removeChild(enlaceDescarga);

  // console.log(result);
};

const searchDocument = () => {
  // every three seconds
  lookinForDocument.value = setInterval(() => {
    if (!canvas.value) return;
    const contour = scanner.value.findPaperContour(cv.imread(canvas.value));

    if (!contour) {
      console.log("No document found");
      return;
    }
    const cornerPoints = scanner.value.getCornerPoints(contour);
    const dimensions = calculateDimensions(cornerPoints);
    const probableDocuments = compareDimensions(
      dimensions.width,
      dimensions.height
    );

    scannedPercentage.value = Math.floor(probableDocuments.matchPercentage);
  }, 2000);
};

const cancelSearch = () => {
  clearInterval(lookinForDocument.value);
};

const calculateDimensions = (corners) => {
  const topLeft = corners.topLeftCorner;
  const topRight = corners.topRightCorner;
  const bottomLeft = corners.bottomLeftCorner;
  const bottomRight = corners.bottomRightCorner;

  // Calculate the distance between opposite corners to get width and height
  const width = Math.sqrt(
    Math.pow(topRight.x - topLeft.x, 2) + Math.pow(topRight.y - topLeft.y, 2)
  );
  const height = Math.sqrt(
    Math.pow(bottomLeft.x - topLeft.x, 2) +
      Math.pow(bottomLeft.y - topLeft.y, 2)
  );

  return { width, height };
};

const compareDimensions = (width, height) => {
  // Define las dimensiones estándar de documentos comunes
  const documents = {
    A4: { width: 210, height: 297 },
    Letter: { width: 8.5 * 25.4, height: 11 * 25.4 }, // Convertir pulgadas a milímetros
    // Agrega más documentos según sea necesario
  };

  // Calcula la proporción de las dimensiones entregadas
  const ratio = width / height;

  // Inicializa variables para almacenar la información de comparación
  let possibleDocuments = [];
  let maxPercentage = 0;

  // Compara con las dimensiones de cada documento
  for (const document in documents) {
    const documentDimensions = documents[document];
    const documentRatio = documentDimensions.width / documentDimensions.height;

    // Calcula el porcentaje de coincidencia
    const percentage =
      (1 - Math.abs(ratio - documentRatio) / documentRatio) * 100;

    // Si es un porcentaje más alto, actualiza la información
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      possibleDocuments = [document];
    } else if (percentage === maxPercentage) {
      // Si es igual, agrega el documento a la lista
      possibleDocuments.push(document);
    }
  }

  // Retorna el objeto con la información
  return {
    possibleDocuments,
    matchPercentage: maxPercentage.toFixed(2),
  };
};

const getColorByPercentage = (percentage) => {
  if (percentage < 50) {
    return "indianred";
  } else if (percentage < 75) {
    return "orange";
  } else if (percentage < 90) {
    return "yellow";
  } else if (percentage < 94) {
    return "lightgreen";
  } else if (percentage < 98) {
    return "lawngreen";
  } else {
    return "lawngreen";
  }
};

watch(scannedPercentage, (value) => {
  if (value > acceptablePercentage) {
    isDocument.value = true;
  } else {
    isDocument.value = false;
  }
});

const goBack = () => {
  photo.value = false;
  openCamera();
};
</script>
<template>
  <div class="flex justify-content-end mb-3">
    <ChangeThemeComponent />
  </div>

  <div class="text-900 font-bold text-5xl mb-4 text-center">QuizPilot</div>
  <div class="flex justify-content-center">
    <div class="flex flex-column lg:flex-row gap-4 xl:px-8 xl:mx-8">
      <div
        v-if="!running && !photo"
        class="bg-primary p-3 border-round-lg fadein"
      >
        <div
          class="border-3 border-dashed border-round-lg surface-border z-1 flex align-items-center justify-content-center"
          style="min-width: 350px; min-height: 300px"
        >
          <ZapIcon
            size="180"
            class="text-900 flex align-items-center justify-content-center"
          ></ZapIcon>
        </div>
      </div>
      <div
        v-if="running && !photo"
        class="bg-primary p-3 border-round-lg fadein animation-duration-1000"
      >
        <div
          class="border-2 border-dashed border-round-lg surface-border z-1 flex align-items-center justify-content-center"
          style="min-width: 350px; min-height: 300px"
        >
          <canvas
            ref="canvas"
            width="100%"
            class="overflow-hidden"
            :style="{
              maxWidth: '530px',
              borderRadius: '10px',
              boxShadow: 'inset 0px 0px 103px rgba(0, 0, 0, 0.75)',
            }"
          />
        </div>
        <p class="p-0 m-0 text-900">
          Possible document: {{ scannedPercentage }}%
          <ProgressBar
            :value="scannedPercentage"
            :showValue="false"
            style="height: 6px"
            :pt="{
              value: {
                style: {
                  background: 'linear-gradient(to right, #F87171, #86EFAC)',
                },
              },
            }"
          />
        </p>
      </div>
      <div
        v-if="!running && photo"
        class="bg-primary p-3 border-round-lg fadein"
      >
        <div
          class="border-3 border-dashed border-round-lg surface-border z-1 flex align-items-center justify-content-center"
          style="min-width: 350px; min-height: 300px"
        >
          <Image :src="photo" width="100%" />
        </div>
      </div>
    </div>
  </div>
  <div class="flex mt-4">
    <SectionComponent :disableTitle="true">
      <!-- all items to center -->
      <div class="flex justify-content-center">
        <Button
          v-if="!running && !photo"
          label="Open Camera"
          @click="openCamera"
          class="mb-3 z-1"
        >
          <template #icon>
            <VideoIcon class="mr-2"></VideoIcon>
          </template>
        </Button>

        <Button
          v-if="running"
          label="Close Camera"
          @click="closeCamera"
          severity="danger"
          class="mb-3 mr-3 z-1"
        >
          <template #icon>
            <VideoOffIcon class="mr-2"></VideoOffIcon>
          </template>
        </Button>
        <Button
          v-if="running"
          label="Take Picture"
          @click="takePicture"
          severity="success"
          class="mb-3 z-10"
        >
          <template #icon>
            <CameraIcon class="mr-2"></CameraIcon>
          </template>
        </Button>
        <Button
          v-if="!running && photo"
          label="Go Back"
          @click="goBack"
          severity="warning"
          class="mb-3 mr-3 z-10"
        >
          <template #icon>
            <CornerDownLeftIcon class="mr-2"></CornerDownLeftIcon>
          </template>
        </Button>
        <Button
          v-if="!running && photo"
          label="Download Picture"
          @click="downloadImage"
          severity="success"
          class="mb-3 z-10"
        >
          <template #icon>
            <CameraIcon class="mr-2"></CameraIcon>
          </template>
        </Button>
      </div>
    </SectionComponent>
  </div>
</template>
<style scoped>
.video-player {
  -webkit-box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.369);
}
</style>
