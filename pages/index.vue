<script setup>
const video = ref(document.createElement("video"));
const canvas = ref(document.createElement("canvas"));
const canvasTemporal = ref(document.createElement("canvas"));
const running = ref(false);
const lookinForDocument = ref(null);
const scanner = ref(new jscanify());

const openCamera = () => {
  const constraints = {
    video: {
      facingMode: "environment", // 'environment' para la cámara trasera, 'user' para la cámara frontal
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleVideoStream)
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
  canvasCtx.imageSmoothingEnabled = true;
  canvasCtx.imageSmoothingQuality = "high";
  video.value.srcObject = stream;
  video.value.onloadedmetadata = () => {
    video.value.play();
    running.value = true;

    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;

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

const searchDocument = () => {
  // every three seconds
  lookinForDocument.value = setInterval(() => {
    if (!canvas.value) return;
    const contour = scanner.value.findPaperContour(cv.imread(canvas.value));
    const cornerPoints = scanner.value.getCornerPoints(contour);

    const dimensions = calculateDimensions(cornerPoints);
    console.log("Width:", dimensions.width, "Height:", dimensions.height);

    const result = scanner.value.extractPaper(
      canvas.value,
      dimensions.width,
      dimensions.height
    );
    if (!canvas.value) {
      console.log("canvas not found, stopping search");
      cancelSearch();
    }
    if (result) {
      const canvasCtx = canvasTemporal.value.getContext("2d");
      canvasCtx.imageSmoothingEnabled = true;
      canvasCtx.imageSmoothingQuality = "high";

      canvasTemporal.value.width = result.width;
      canvasTemporal.value.height = result.height;

      canvasCtx.drawImage(result, 0, 0, result.width, result.height);
    }
  }, 3000);
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
</script>
<template>
  <div class="flex justify-content-end mb-3">
    <ChangeThemeComponent />
  </div>

  <div class="text-900 font-bold text-5xl mb-4 text-center">QuizPilot</div>
  <div class="flex justify-content-center">
    <div class="flex flex-column lg:flex-row gap-4 xl:px-8 xl:mx-8">
      <div class="bg-primary p-3 border-round-lg">
        <div
          class="border-1 border-dashed border-round-lg surface-border z-1"
          style="min-width: 300px"
        >
          <canvas
            ref="canvas"
            width="100%"
            class="overflow-hidden"
            style="max-width: 400px"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="flex mt-4">
    <SectionComponent :disableTitle="true">
      <!-- all items to center -->
      <div class="flex justify-content-center">
        <Button
          v-if="!running"
          label="Open Camera"
          icon="pi pi-video"
          @click="openCamera"
          class="mb-3"
        >
          <template #icon>
            <VideoIcon class="mr-2"></VideoIcon>
          </template>
        </Button>

        <Button
          v-if="running"
          label="Close Camera"
          icon="pi pi-video-slash"
          @click="closeCamera"
          severity="danger"
          class="mb-3 mr-3"
        >
          <template #icon>
            <VideoOffIcon class="mr-2"></VideoOffIcon>
          </template>
        </Button>
        <Button
          v-if="running"
          label="Take Picture"
          icon="pi pi-video-slash"
          @click="takePicture"
          severity="success"
          class="mb-3"
        >
          <template #icon>
            <CameraIcon class="mr-2"></CameraIcon>
          </template>
        </Button>
      </div>
    </SectionComponent>
  </div>
  <div class="flex justify-content-center">
    <div class="flex flex-column lg:flex-row gap-4 xl:px-8 xl:mx-8">
      <div class="bg-primary p-3 border-round-lg">
        <div
          class="border-1 border-dashed border-round-lg surface-border z-1"
          style="min-width: 300px"
        >
          <canvas
            ref="canvasTemporal"
            width="100%"
            class="overflow-hidden"
            style="max-width: 400px"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.video-player {
  -webkit-box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 0px 103px 0px rgba(0, 0, 0, 0.369);
}
</style>
