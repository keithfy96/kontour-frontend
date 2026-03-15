import svgPaths from "./svg-4740tjuht3";
import imgImg from "../assets/tokyo-shibuya.jpg";
import imgImg1 from "../assets/kyoto-shrine.jpg";
import imgImg2 from "../assets/paris-eiffel.jpg";
import imgImg3 from "../assets/santorini-sunset.jpg";

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ArrowLeft">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ArrowLeft">
          <path d={svgPaths.p33f6b680} id="Vector" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15.8333 10H4.16667" id="Vector_2" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[24.01px] relative shrink-0 w-[104.844px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[52.5px] not-italic text-[#afa99e] text-[16px] text-center top-[-1.89px] whitespace-nowrap">Back to Home</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[24.01px] relative shrink-0 w-[132.83px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center relative size-full">
        <ArrowLeft />
        <Span />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[24.01px] relative shrink-0 w-[286.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#9e9589] text-[16px] top-[-1.89px] whitespace-nowrap">
          <span className="leading-[24px]">Analyzing:</span>
          <span className="leading-[24px] text-[#e1dfdb]">{` instagram.com/reel/xyz123`}</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#0c0e11] content-stretch flex h-[55.99px] items-center justify-between left-0 px-[88.108px] top-0 w-[1512.222px]" data-name="Container">
      <Button />
      <Container1 />
    </div>
  );
}

function H() {
  return (
    <div className="absolute h-[31.979px] left-0 top-0 w-[651.997px]" data-name="h2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#e1dfdb] text-[24px] top-[-3.11px] whitespace-nowrap">Video Analysis</p>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="svg">
          <path d={svgPaths.p298d4080} fill="var(--fill-0, #4AE081)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[#263b32] content-stretch flex items-center justify-center left-[208.89px] rounded-[37282700px] size-[80px] top-[369.34px]" data-name="Container">
      <Svg />
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[24.01px] left-[203.37px] top-[465.33px] w-[91.024px]" data-name="p">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#e1dfdb] text-[16px] top-[-1.89px] whitespace-nowrap">Travel Video</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[19.983px] items-start left-[98.47px] top-[497.33px] w-[300.833px]" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] text-center whitespace-nowrap">Click detected locations to jump to timestamp</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[886.667px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <P />
      <P1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[#12151a] h-[888.889px] left-0 rounded-[20px] top-[47.97px] w-[500px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.111px] relative rounded-[inherit] size-full">
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border-[#7d7467] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[936.858px] left-0 top-0 w-[651.997px]" data-name="Container">
      <H />
      <Container4 />
    </div>
  );
}

function H1() {
  return (
    <div className="h-[31.979px] relative shrink-0 w-[230.226px]" data-name="h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#e1dfdb] text-[24px] top-[-3.11px] whitespace-nowrap">Detected Locations</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[66.024px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] whitespace-nowrap">2 selected</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[31.979px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <H1 />
      <Span1 />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img />
      </div>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[26.997px] overflow-clip relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#e1dfdb] text-[18px] top-[-0.89px] whitespace-nowrap">Shibuya Crossing</p>
    </div>
  );
}

function MapPin() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_148)" id="MapPin">
          <path d={svgPaths.p2f87a480} id="Vector" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
          <path d={svgPaths.pb3c1080} id="Vector_2" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_148">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[82.517px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#afa99e] text-[14px] whitespace-nowrap">Tokyo, Japan</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[7.986px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <MapPin />
      <Span2 />
    </div>
  );
}

function Star() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_135)" id="Star">
          <path d={svgPaths.pf067c00} fill="var(--fill-0, #FBC434)" id="Vector" stroke="var(--stroke-0, #FBC434)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_135">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[19.774px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#e1dfdb] text-[14px] whitespace-nowrap">4.8</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[39.757px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.993px] items-center relative size-full">
        <Star />
        <Span3 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[44.01px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] whitespace-nowrap">@ 0:23</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[15.99px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Span4 />
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.986px] items-start relative size-full">
        <H2 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[15.99px] h-[127.969px] items-start left-[1.11px] pt-[15.99px] px-[15.99px] top-[1.11px] w-[649.792px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container17() {
  return <div className="absolute bg-[#12151a] border-[#766d61] border-[1.111px] border-solid left-[614.91px] rounded-[37282700px] size-[23.993px] top-[13.11px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="bg-[#12151a] h-[130.191px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container11 />
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border-[#7d7467] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img1 />
      </div>
    </div>
  );
}

function H3() {
  return (
    <div className="h-[26.997px] overflow-clip relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#e1dfdb] text-[18px] top-[-0.89px] whitespace-nowrap">Fushimi Inari Shrine</p>
    </div>
  );
}

function MapPin1() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_148)" id="MapPin">
          <path d={svgPaths.p2f87a480} id="Vector" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
          <path d={svgPaths.pb3c1080} id="Vector_2" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_148">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[81.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#afa99e] text-[14px] whitespace-nowrap">Kyoto, Japan</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[7.986px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <MapPin1 />
      <Span5 />
    </div>
  );
}

function Star1() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_135)" id="Star">
          <path d={svgPaths.pf067c00} fill="var(--fill-0, #FBC434)" id="Vector" stroke="var(--stroke-0, #FBC434)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_135">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[19.774px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#e1dfdb] text-[14px] whitespace-nowrap">4.9</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[39.757px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.993px] items-center relative size-full">
        <Star1 />
        <Span6 />
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[44.01px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] whitespace-nowrap">@ 1:45</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[15.99px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Span7 />
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.986px] items-start relative size-full">
        <H3 />
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[15.99px] h-[127.969px] items-start left-[1.11px] pt-[15.99px] px-[15.99px] top-[1.11px] w-[649.792px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Check">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Check">
          <path d={svgPaths.pbec7980} id="Vector" stroke="var(--stroke-0, #DDDAD5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#1b9e4b] content-stretch flex items-center justify-center left-[614.91px] pl-[1.111px] pr-[1.128px] py-[1.111px] rounded-[37282700px] size-[23.993px] top-[13.11px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#1b9e4c] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]" />
      <Check />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#12151a] h-[130.191px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container19 />
        <Container25 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1b9e4c] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Img2() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg2} />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img2 />
      </div>
    </div>
  );
}

function H4() {
  return (
    <div className="h-[26.997px] overflow-clip relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#e1dfdb] text-[18px] top-[-0.89px] whitespace-nowrap">Eiffel Tower</p>
    </div>
  );
}

function MapPin2() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_148)" id="MapPin">
          <path d={svgPaths.p2f87a480} id="Vector" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
          <path d={svgPaths.pb3c1080} id="Vector_2" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_148">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[83.681px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#afa99e] text-[14px] whitespace-nowrap">Paris, France</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[7.986px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <MapPin2 />
      <Span8 />
    </div>
  );
}

function Star2() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_135)" id="Star">
          <path d={svgPaths.pf067c00} fill="var(--fill-0, #FBC434)" id="Vector" stroke="var(--stroke-0, #FBC434)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_135">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[19.774px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#e1dfdb] text-[14px] whitespace-nowrap">4.7</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[39.757px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.993px] items-center relative size-full">
        <Star2 />
        <Span9 />
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[44.01px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] whitespace-nowrap">@ 2:10</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[15.99px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Span10 />
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.986px] items-start relative size-full">
        <H4 />
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[15.99px] h-[127.969px] items-start left-[1.11px] pt-[15.99px] px-[15.99px] top-[1.11px] w-[649.792px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Check">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="Check">
          <path d={svgPaths.pbec7980} id="Vector" stroke="var(--stroke-0, #DDDAD5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#1b9e4b] content-stretch flex items-center justify-center left-[614.91px] pl-[1.111px] pr-[1.128px] py-[1.111px] rounded-[37282700px] size-[23.993px] top-[13.11px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#1b9e4c] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]" />
      <Check1 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#12151a] h-[130.191px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container27 />
        <Container33 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1b9e4c] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Img3() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg3} />
    </div>
  );
}

function Container36() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img3 />
      </div>
    </div>
  );
}

function H5() {
  return (
    <div className="h-[26.997px] overflow-clip relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#e1dfdb] text-[18px] top-[-0.89px] whitespace-nowrap">Santorini Sunset</p>
    </div>
  );
}

function MapPin3() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_148)" id="MapPin">
          <path d={svgPaths.p2f87a480} id="Vector" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
          <path d={svgPaths.pb3c1080} id="Vector_2" stroke="var(--stroke-0, #AFA99E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_148">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span11() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[112.813px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#afa99e] text-[14px] whitespace-nowrap">Santorini, Greece</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[7.986px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <MapPin3 />
      <Span11 />
    </div>
  );
}

function Star3() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g clipPath="url(#clip0_49_135)" id="Star">
          <path d={svgPaths.pf067c00} fill="var(--fill-0, #FBC434)" id="Vector" stroke="var(--stroke-0, #FBC434)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33247" />
        </g>
        <defs>
          <clipPath id="clip0_49_135">
            <rect fill="white" height="15.9896" width="15.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[8.021px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#e1dfdb] text-[14px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[28.003px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.993px] items-center relative size-full">
        <Star3 />
        <Span12 />
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[44.01px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9e9589] text-[14px] whitespace-nowrap">@ 3:42</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[15.99px] h-[19.983px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Span13 />
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.986px] items-start relative size-full">
        <H5 />
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[15.99px] h-[127.969px] items-start left-[1.11px] pt-[15.99px] px-[15.99px] top-[1.11px] w-[649.792px]" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container41() {
  return <div className="absolute bg-[#12151a] border-[#766d61] border-[1.111px] border-solid left-[614.91px] rounded-[37282700px] size-[23.993px] top-[13.11px]" data-name="Container" />;
}

function Container34() {
  return (
    <div className="bg-[#12151a] h-[130.191px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container35 />
        <Container41 />
      </div>
      <div aria-hidden="true" className="absolute border-[#7d7467] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[11.997px] h-[556.753px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container18 />
      <Container26 />
      <Container34 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1b9e4b] h-[51.997px] relative rounded-[14px] shrink-0 w-full" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[326.4px] not-italic text-[#dddad5] text-[16px] text-center top-[12.1px] whitespace-nowrap">Save Selected (2)</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.99px] h-[936.858px] items-start left-[683.99px] top-0 w-[652.014px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[936.858px] left-[88.11px] top-[87.99px] w-[1336.007px]" data-name="Container">
      <Container3 />
      <Container7 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#0c0e11] h-[1056.84px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container2 />
    </div>
  );
}

export default function DesignHeroPage() {
  return (
    <div className="bg-[#181a1b] content-stretch flex flex-col items-start relative size-full" data-name="Design Hero Page">
      <Div />
    </div>
  );
}
