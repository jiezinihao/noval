
<template>
  <div class="rotation">
    <div id="myCarousel" class="carousel slide">
      <div class="carousel-inner">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
          <li data-target="#myCarousel" data-slide-to="3"></li>
          <li data-target="#myCarousel" data-slide-to="4"></li>
        </ol>
        <div class="item active">
          <a href="#">
            <img src="../../assets/img/01.jpg" alt="第一张" width="100%" />
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="../../assets/img/01.jpg" alt="第二张" width="100%" />
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="../../assets/img/01.jpg" alt="第三张" width="100%" />
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="../../assets/img/01.jpg" alt="第四张" width="100%" />
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="../../assets/img/01.jpg" alt="第五张" width="100%" />
          </a>
        </div>
        <a href="#myCarousel" data-slide="prev" class="carousel-control left">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a href="#myCarousel" data-slide="next" class="carousel-control right">
          <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.rotation{
  margin-right:20%;
}
#myCarousel {
  img{
    width: auto;
    height: 200px;
    margin: 0 auto;
  }
}
</style>