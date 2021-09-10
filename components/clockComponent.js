const template = document.createElement("template");

template.innerHTML = `
<style>

.clock {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: antiquewhite;
    margin: auto;
    position: relative;
    border:20px solid cornsilk;
    display: inline-block;
}

.center {
    background-color: #000;
    position: absolute;
    left: calc(50% - 10px);
    top:  calc(50% - 10px);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: 20;
}

.hourHand {
    width: 10px;
    height: 75px;
    background-color: #000;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: 75px;
    left: 145px;
    z-index: 10;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    transform: rotate(360deg);
}

.minuteHand{
    width: 5px;
    height: 120px;
    background-color: #000;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: 30px;
    left: 147px;
    z-index: 9;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
      transform: rotate(90deg);

}

.secondHand{
    width: 2px;
    height: 120px;
    background-color:red;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: 30px;
    left: 149px;
    transition: all 0.06s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    z-index: 8;
      transform: rotate(360deg);

}

.time{
    position: absolute;
    top: 45%;
    left: 10%;
    border: 1px solid #fff8dc;
    background-color: #fff;
    padding: 5px;
    display: block;
    box-shadow: inset 0px 2px 5px rgba(0,0,0,.4);
    border-radius: 5px;
    min-width: 70px;
    height: 15px;

}
.time small{
    color:red;
    transition: all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}

.clock ul{
    list-style: none;
    padding: 0;

}

.clock ul li{
    position: absolute;
    width:20px;
    height:20px;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
    color:red;
}

.clock ul li:nth-child(1){
    right: 22%;
    top:6.5%;
}

.clock ul li:nth-child(2){
    right: 6%;
    top:25%;
}

.clock ul li:nth-child(3){
    right: 1%;
    top:calc(50% - 10px);
    color:#000;
    font-size: 20px;
    font-weight: bold;
}

.clock ul li:nth-child(4){
    right: 6%;
    top:69%;
}

.clock ul li:nth-child(5){
    right: 22%;
    top:84%;
}

.clock ul li:nth-child(6){
    right: calc(50% - 10px);
    top:calc(99% - 20px);
    color:#000;
    font-size: 20px;
    font-weight: bold;
}

.clock ul li:nth-child(7){
    left: 22%;
    top:84%;
}

.clock ul li:nth-child(8){
    left: 6%;
    top:69%;
}
.clock ul li:nth-child(9){
    left: 1%;
    top:calc(50% - 10px);
    color:#000;
    font-size: 20px;
    font-weight: bold;
}
.clock ul li:nth-child(10){
    left: 6%;
    top:25%;
}

.clock ul li:nth-child(11){
    left: 22%;
    top:6.5%;
}

.clock ul li:nth-child(12){
    right: calc(50% - 10px);
    top:1%;
    color:#000;
    font-size: 20px;
    font-weight: bold;
}

</style>
<div class="clock">
    <div class="hourHand"></div>
    <div class="minuteHand"></div>
    <div class="secondHand"></div>
    <div class="center"></div>
    <div class="time"></div>
    <ul>
      <li><span>1</span></li>
      <li><span>2</span></li>
      <li><span>3</span></li>
      <li><span>4</span></li>
      <li><span>5</span></li>
      <li><span>6</span></li>
      <li><span>7</span></li>
      <li><span>8</span></li>
      <li><span>9</span></li>
      <li><span>10</span></li>
      <li><span>11</span></li>
      <li><span>12</span></li>
    </ul>
</div>

<audio src="/click-audio.mp3" class="audio"   ></audio>
`;

class ClockItem extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    
    const hourHand = this.shadowRoot.querySelector('.hourHand');
    const minuteHand = this.shadowRoot.querySelector('.minuteHand');
    const secondHand = this.shadowRoot.querySelector('.secondHand');
    const time = this.shadowRoot.querySelector('.time');
    const clock = this.shadowRoot.querySelector('.clock');
    const audio = this.shadowRoot.querySelector('.audio');
  
    function setDate(){
      const today = new Date();
    
      const second = today.getSeconds();
      const secondDeg = ((second / 60) * 360) + 360;
      secondHand.style.transform = `rotate(${secondDeg}deg)`;
    
      // audio.play();
    
      const minute = today.getMinutes();
      const minuteDeg = ((minute / 60) * 360);
      minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    
      const hour = today.getHours();
      const hourDeg = ((hour / 12 ) * 360 );
      hourHand.style.transform = `rotate(${hourDeg}deg)`;
    
      if(minute === 0 && second === 0) {
        audio.play();
      }
      time.innerHTML = '<span>' + '<strong>' + hour + '</strong>' + ' : ' + minute + ' : ' + '<small>' + second +'</small>'+ '</span>';
    
    }
  
    setInterval(setDate, 1000);
  
  }
}

window.customElements.define("clock-item", ClockItem);