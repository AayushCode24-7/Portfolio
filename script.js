function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true ,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
     ./model/male0001.png
     ./model/male0002.png
     ./model/male0003.png
     ./model/male0004.png
     ./model/male0005.png
     ./model/male0006.png
     ./model/male0007.png
     ./model/male0008.png
     ./model/male0009.png
     ./model/male0010.png
     ./model/male0011.png
     ./model/male0012.png
     ./model/male0013.png
     ./model/male0014.png
     ./model/male0015.png
     ./model/male0016.png
     ./model/male0017.png
     ./model/male0018.png
     ./model/male0019.png
     ./model/male0020.png
     ./model/male0021.png
     ./model/male0022.png
     ./model/male0023.png
     ./model/male0024.png
     ./model/male0025.png
     ./model/male0026.png
     ./model/male0027.png
     ./model/male0028.png
     ./model/male0029.png
     ./model/male0030.png
     ./model/male0031.png
     ./model/male0032.png
     ./model/male0033.png
     ./model/male0034.png
     ./model/male0035.png
     ./model/male0036.png
     ./model/male0037.png
     ./model/male0038.png
     ./model/male0039.png
     ./model/male0040.png
     ./model/male0041.png
     ./model/male0042.png
     ./model/male0043.png
     ./model/male0044.png
     ./model/male0045.png
     ./model/male0046.png
     ./model/male0047.png
     ./model/male0048.png
     ./model/male0049.png
     ./model/male0050.png
     ./model/male0051.png
     ./model/male0052.png
     ./model/male0053.png
     ./model/male0054.png
     ./model/male0055.png
     ./model/male0056.png
     ./model/male0057.png
     ./model/male0058.png
     ./model/male0059.png
     ./model/male0060.png
     ./model/male0061.png
     ./model/male0062.png
     ./model/male0063.png
     ./model/male0064.png
     ./model/male0065.png
     ./model/male0066.png
     ./model/male0067.png
     ./model/male0068.png
     ./model/male0069.png
     ./model/male0070.png
     ./model/male0071.png
     ./model/male0072.png
     ./model/male0073.png
     ./model/male0074.png
     ./model/male0075.png
     ./model/male0076.png
     ./model/male0077.png
     ./model/male0078.png
     ./model/male0079.png
     ./model/male0080.png
     ./model/male0081.png
     ./model/male0082.png
     ./model/male0083.png
     ./model/male0084.png
     ./model/male0085.png
     ./model/male0086.png
     ./model/male0087.png
     ./model/male0088.png
     ./model/male0089.png
     ./model/male0090.png
     ./model/male0091.png
     ./model/male0092.png
     ./model/male0093.png
     ./model/male0094.png
     ./model/male0095.png
     ./model/male0096.png
     ./model/male0097.png
     ./model/male0098.png
     ./model/male0099.png
     ./model/male0100.png
     ./model/male0101.png
     ./model/male0102.png
     ./model/male0103.png
     ./model/male0104.png
     ./model/male0105.png
     ./model/male0106.png
     ./model/male0107.png
     ./model/male0108.png
     ./model/male0109.png
     ./model/male0110.png
     ./model/male0111.png
     ./model/male0112.png
     ./model/male0113.png
     ./model/male0114.png
     ./model/male0115.png
     ./model/male0116.png
     ./model/male0117.png
     ./model/male0118.png
     ./model/male0119.png
     ./model/male0120.png
     ./model/male0121.png
     ./model/male0122.png
     ./model/male0123.png
     ./model/male0124.png
     ./model/male0125.png
     ./model/male0126.png
     ./model/male0127.png
     ./model/male0128.png
     ./model/male0129.png
     ./model/male0130.png
     ./model/male0131.png
     ./model/male0132.png
     ./model/male0133.png
     ./model/male0134.png
     ./model/male0135.png
     ./model/male0136.png
     ./model/male0137.png
     ./model/male0138.png
     ./model/male0139.png
     ./model/male0140.png
     ./model/male0141.png
     ./model/male0142.png
     ./model/male0143.png
     ./model/male0144.png
     ./model/male0145.png
     ./model/male0146.png
     ./model/male0147.png
     ./model/male0148.png
     ./model/male0149.png
     ./model/male0150.png
     ./model/male0151.png
     ./model/male0152.png
     ./model/male0153.png
     ./model/male0154.png
     ./model/male0155.png
     ./model/male0156.png
     ./model/male0157.png
     ./model/male0158.png
     ./model/male0159.png
     ./model/male0160.png
     ./model/male0161.png
     ./model/male0162.png
     ./model/male0163.png
     ./model/male0164.png
     ./model/male0165.png
     ./model/male0166.png
     ./model/male0167.png
     ./model/male0168.png
     ./model/male0169.png
     ./model/male0170.png
     ./model/male0171.png
     ./model/male0172.png
     ./model/male0173.png
     ./model/male0174.png
     ./model/male0175.png
     ./model/male0176.png
     ./model/male0177.png
     ./model/male0178.png
     ./model/male0179.png
     ./model/male0180.png
     ./model/male0181.png
     ./model/male0182.png
     ./model/male0183.png
     ./model/male0184.png
     ./model/male0185.png
     ./model/male0186.png
     ./model/male0187.png
     ./model/male0188.png
     ./model/male0189.png
     ./model/male0190.png
     ./model/male0191.png
     ./model/male0192.png
     ./model/male0193.png
     ./model/male0194.png
     ./model/male0195.png
     ./model/male0196.png
     ./model/male0197.png
     ./model/male0198.png
     ./model/male0199.png
     ./model/male0200.png
     ./model/male0201.png
     ./model/male0202.png
     ./model/male0203.png
     ./model/male0204.png
     ./model/male0205.png
     ./model/male0206.png
     ./model/male0207.png
     ./model/male0208.png
     ./model/male0209.png
     ./model/male0210.png
     ./model/male0211.png
     ./model/male0212.png
     ./model/male0213.png
     ./model/male0214.png
     ./model/male0215.png
     ./model/male0216.png
     ./model/male0217.png
     ./model/male0218.png
     ./model/male0219.png
     ./model/male0220.png
     ./model/male0221.png
     ./model/male0222.png
     ./model/male0223.png
     ./model/male0224.png
     ./model/male0225.png
     ./model/male0226.png
     ./model/male0227.png
     ./model/male0228.png
     ./model/male0229.png
     ./model/male0230.png
     ./model/male0231.png
     ./model/male0232.png
     ./model/male0233.png
     ./model/male0234.png
     ./model/male0235.png
     ./model/male0236.png
     ./model/male0237.png
     ./model/male0238.png
     ./model/male0239.png
     ./model/male0240.png
     ./model/male0241.png
     ./model/male0242.png
     ./model/male0243.png
     ./model/male0244.png
     ./model/male0245.png
     ./model/male0246.png
     ./model/male0247.png
     ./model/male0248.png
     ./model/male0249.png
     ./model/male0250.png
     ./model/male0251.png
     ./model/male0252.png
     ./model/male0253.png
     ./model/male0254.png
     ./model/male0255.png
     ./model/male0256.png
     ./model/male0257.png
     ./model/male0258.png
     ./model/male0259.png
     ./model/male0260.png
     ./model/male0261.png
     ./model/male0262.png
     ./model/male0263.png
     ./model/male0264.png
     ./model/male0265.png
     ./model/male0266.png
     ./model/male0267.png
     ./model/male0268.png
     ./model/male0269.png
     ./model/male0270.png
     ./model/male0271.png
     ./model/male0272.png
     ./model/male0273.png
     ./model/male0274.png
     ./model/male0275.png
     ./model/male0276.png
     ./model/male0277.png
     ./model/male0278.png
     ./model/male0279.png
     ./model/male0280.png
     ./model/male0281.png
     ./model/male0282.png
     ./model/male0283.png
     ./model/male0284.png
     ./model/male0285.png
     ./model/male0286.png
     ./model/male0287.png
     ./model/male0288.png
     ./model/male0289.png
     ./model/male0290.png
     ./model/male0291.png
     ./model/male0292.png
     ./model/male0293.png
     ./model/male0294.png
     ./model/male0295.png
     ./model/male0296.png
     ./model/male0297.png
     ./model/male0298.png
     ./model/male0299.png
     ./model/male0300.png
 `;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});



gsap.to("#page1",{
  scrollTrigger:{
    trigger:`#page1`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page2",{
  scrollTrigger:{
    trigger:`#page2`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page3",{
  scrollTrigger:{
    trigger:`#page3`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})