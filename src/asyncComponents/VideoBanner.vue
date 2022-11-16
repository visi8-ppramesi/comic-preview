<template>
    <div class="flex w-full h-full">
        <video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video>
        <div class="w-full h-full comic-video-background items-center justify-center z-20 flex text-white">
            <!-- <div class="benday1 relative"></div> -->
            <!-- <div class="benday2 relative"></div>
            <div class="benday3 relative"></div> -->
            <!-- <div class="benday4 relative"></div> -->
            <img v-show="imgSrc" class="w-96 absolute" :src="imgSrc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'video-banner',
    data(){
        return {
            // videoSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965',
            videoSrc: require("@/assets/test-compressed.mp4"),
            imgSrc: require("@/assets/visi8_logo_2.png")//'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fvisi8_logo_new.png?alt=media&token=0604045f-2bb6-495b-8105-9ebd811306b8',
        }
    }
}
</script>

<style lang="scss">
$dots: rgb(0, 0, 0);

.comic-video-background {
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g  fill="%23250E17"><circle cx="25" cy="25" r="12.5"/><circle cx="75" cy="75" r="12.5"/><circle cx="75" cy="25" r="12.5"/><circle cx="25" cy="75" r="12.5"/></g></svg>'),
    rgba(0, 0, 0, 0.5);
  background-size: 12px, 100%;
}

.benday1 {  
    height: 100vh;
    width: 200vh;
    rotate: (0deg);
    opacity: 75%;
    border-radius: 0%;
  
    $back-pos: ();
    @for $i from 0 through 13 {
        $back-pos: append($back-pos, (($i * 3.75  ) + vh) 0, $separator:comma);
    }
  
  background-image:
    radial-gradient(
      circle,
      $dots 70%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 65%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 60%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 55%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 50%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 45%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 40%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 35%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 30%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 25%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 20%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 15%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 10%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 5%,
      transparent 0
    );
 
    background-size: 4vh 4vh;
    background-repeat: repeat-y;
    
    background-position: $back-pos;
  }

.benday2 {  
    height: 80vh;
    width: 100vh;
    rotate: (320deg);
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
    opacity: 85%;
  
    $back-pos: ();
    @for $i from 0 through 13 {
        $back-pos: append($back-pos, (($i * 4  ) + vh) 0, $separator:comma);
    }
  
  background-image:
    radial-gradient(
      circle,
      $dots 60%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 55%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 50%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 45%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 40%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 35%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 30%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 25%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 20%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 15%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 10%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 5%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 3%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 1%,
      transparent 0
    );
 
    background-size: 4vh 4vh;
    background-repeat: repeat-y;
    
    background-position: $back-pos;
  }

  .benday3 {  
    height: 100vh;
    width: 100vh;
    rotate: (180deg);
    border-radius: 0%;
    opacity: 85%;
  
    $back-pos: ();
    @for $i from 0 through 13 {
        $back-pos: append($back-pos, (($i * 4  ) + vh) 0, $separator:comma);
    }
  
  background-image:
    radial-gradient(
      circle,
      $dots 60%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 55%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 50%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 45%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 40%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 35%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 30%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 25%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 20%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 15%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 10%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 5%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 3%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 1%,
      transparent 0
    );
 
    background-size: 4vh 4vh;
    background-repeat: repeat-y;
    
    background-position: $back-pos;
  }

  .benday4 {  
    height: 100vh;
    width: 200vh;
    rotate: (180deg);
    border-radius: 0%;
    opacity: 75%;
  
    $back-pos: ();
    @for $i from 0 through 13 {
        $back-pos: append($back-pos, (($i * 4  ) + vh) 0, $separator:comma);
    }
  
  background-image:
    radial-gradient(
      circle,
      $dots 70%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 65%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 60%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 55%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 50%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 45%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 40%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 35%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 30%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 25%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 20%,
      transparent 0
    ),
      radial-gradient(
      circle,
      $dots 15%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 10%,
      transparent 0
    ),
    radial-gradient(
      circle,
      $dots 5%,
      transparent 0
    );
 
    background-size: 4vh 4vh;
    background-repeat: repeat-y;
    
    background-position: $back-pos;
  }
</style>