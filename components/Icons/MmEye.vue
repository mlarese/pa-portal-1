<template>


        <div class="mm-eye">
            <svg class="mm-one-eye" width="66px" height="66px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-446 248 66 66" style="enable-background:new -446 248 66 66;" xml:space="preserve">
                <path fill="gray" d="M-446,272c-0.1-0.1,0.1-0.3,0.1-0.3s21.6-19.4,42.6-13.6c19.8,5.5,22.6,15,20.4,17.8c-4.8,6-16.6-5.7-26.6-8.4  c-17.8-4.8-33.8,4.8-34.9,5.3C-445.2,273-445.9,272.3-446,272"/>
                <path fill="gray" d="M-381.7,286.6c0.1,0.1-0.1,0.3-0.1,0.3s-21.3,19.8-42.4,14.4c-19.9-5.1-22.9-14.6-20.7-17.4  c4.7-6,16.7,5.4,26.8,8c17.9,4.5,33.7-5.4,34.8-6C-382.6,285.6-381.9,286.3-381.7,286.6"/>
                <path fill="gray" d="M-415.5,268.9c-5.7,0-10.4,4.7-10.4,10.4s4.6,10.4,10.4,10.4c5.7,0,10.4-4.6,10.4-10.4  S-409.8,268.9-415.5,268.9z M-415.5,287.9c-1,0-1.7-3.9-1.7-8.6c0-4.8,0.8-8.6,1.7-8.6c1,0,1.7,3.9,1.7,8.6  C-413.8,284-414.6,287.9-415.5,287.9z"/>
            </svg>

            <svg class="spinner" width="174px" height="174px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="transparent" stroke-width="2" cx="33" cy="33" r="30" stroke="url(#gradient)"/>
                <linearGradient id="gradient">
                    <stop offset="50%" stop-color="gray" stop-opacity="1"/>
                    <stop offset="65%" stop-color="gray" stop-opacity=".5"/>
                    <stop offset="100%" stop-color="gray" stop-opacity="0"/>
                </linearGradient>
                </circle>
                <svg class="spinner-dot dot" width="5px" height="5px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" x="37" y="1.5">
                    <circle class="path" fill="gray" cx="33" cy="33" r="30"/></circle>
                </svg>
            </svg>
        </div>

</template>
<script>
  export default {
    name: 'MmEye'
  }
</script>

<style lang="scss">

    .mm-eye {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 179px;
        height: 179px;
        pointer-events: none;
        opacity: 1;
        transition: all .7s cubic-bezier(.07,.55,.29,.88);


        .mm-one-eye {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .spinner {
            animation: rotate 1.4s linear infinite;
            width:174px;
            height:174px;
            position: relative;
        }
        .spinner .spinner-dot {
            width:274px;
            height:274px;
            position: relative;
            top: 0;
        }
        .spinner .path {
            stroke-dasharray: 170;
            stroke-dashoffset: 20;
        }

        @keyframes rotate {
            to {
                transform: rotate(360deg);
            }
        }
    }
</style>