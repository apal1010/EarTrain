
    function toggleClass(elem,className){
    if (elem.className.indexOf(className) !== -1){
      elem.className = elem.className.replace(className,'');
    }
    else{
      elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
    }
  
    return elem;
  }
  
  function toggleDisplay(elem){
    const curDisplayStyle = elem.style.display;			
  
    if (curDisplayStyle === 'none' || curDisplayStyle === ''){
      elem.style.display = 'block';
    }
    else{
      elem.style.display = 'none';
    }
  
  }
  
  function toggleMenuDisplay(e){
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.menu');
    const icon = dropdown.querySelector('.fa-angle-right');
  
    //menu.style.transition = "max-height "+(10.0/(0.5*menu.childNodes.length)).toString()+"s ease-in-out";
    menu.style.maxHeight = (0.54*menu.childNodes.length).toString()+"em";
    //menu.style.maxHeight = (1*menu.childNodes.length).toString()+"em";
    toggleClass(menu,'hide');
    toggleClass(icon,'rotate-90');
  }

  function swapselect(e){
    if(e.className.indexOf('unselected') !== -1){
      e.classList.replace('unselected','selected');
    }else{
      e.classList.replace('selected','unselected');
      if(e.id.indexOf('t')!==-1){
        tbatch = true;
      }else{
        sbatch = true;
      }
    }
    return;
  }

  function checkbatch(batch){
    all = true;
    none = true;
    for (let index = 1; index < 8; index++) {
      const element = document.getElementById(batch+index.toString());
      if(element.className.indexOf('unselected')!==-1){
        all = false;
      }else{
        none = false;
      }
    }
    if(batch='t'){
      if(all){
        tbatch=true;
      }else if(none){
        tbatch=false;
      }
    }else{
      if(all){
        sbatch=true;
      }else if(none){
        sbatch=false;
      }
    }
  }

  function setTransitionTime(e){

  }

  function setselect(e,val){
    if(val){
      e.classList.replace('unselected','selected');
    }else{
      e.classList.replace('selected','unselected');
    }
    return;
  }
  
  function handleOptionSelected(e){
    			
  
    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem = e.target.parentNode.parentNode.querySelector('.dropdown .title');
    const icon = e.target.parentNode.parentNode.querySelector('.dropdown .title .fa');

    if (e.target.className.indexOf('option') == -1){
      if(e.target.className.indexOf('batchselect')!==-1){
        var batch = false;
        if(id=='t'){
          batch=tbatch;
          tbatch = !tbatch;
        }else{
          batch=sbatch;
          sbatch = !sbatch;
        }
        for (let index = 1; index < 8; index++) {
          const element = document.getElementById(id+index.toString());
          setselect(element,!batch);
        }
        return;
      }
      swapselect(e.target);
      //checkbatch(e.target.id.charAt(0));
      return;
    }

    var premsg = "Something went wrong: ";


    switch (titleElem.id) {
      case 'key':
        premsg = "Key: "
        break;
      
      case 'instrument':
        premsg = "Instrument: "
        break;

      case 'order':
        premsg = "Order: "
        break;

      default:
        break;
    }
  
  
    titleElem.textContent = premsg+newValue;
    titleElem.appendChild(icon);

    toggleClass(e.target.parentNode, 'hide');

    //trigger custom event
    titleElem.dispatchEvent(new Event('change'));
      //setTimeout is used so transition is properly shown
    setTimeout(() => toggleClass(icon,'rotate-90',0));
  }
  
  function handleTitleChange(e){
    const result = document.getElementById('result');
  
    if(played){
      result.innerHTML = 'The last chord played was: ' + playedChord;
    }
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  function stopAutoPlayer(e){
    e = document.getElementById('button');
    autoPlaying = false;
    window.clearTimeout(autoPlayId);
    document.getElementById('button').innerHTML = "Start Playing Chords";
    autoPlayerReady = true;
    e.removeEventListener('click', stopAutoPlayer);
    e.addEventListener('click', playnoise);
    document.body.onkeyup = function(e){
      if(e.code === "Space"){
          playnoise(e);
      }
    }

  }

  function playnoise(e){
    e = document.getElementById('button');
    if(autoPlayerReady){
      autoPlaying = true;
      autoPlayerReady = false;
      e.innerHTML = "Pause";
      e.removeEventListener('click', playnoise);
      e.addEventListener('click', stopAutoPlayer);
      document.body.onkeyup = function(e){
        if(e.code === "Space"){
            stopAutoPlayer(e);
        }
      }
    
    }
    if(autoPlaying){
      autoPlayId = window.setTimeout(playnoise,delay/2);
    }
    if(played){
      document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    }else{
      //mySound.play();
      var chord = generateRandChord();
      //chord = applyInversion(chord);
      playedChord+=", notes are: " + chord;
      playChord(chord);

      
    }
    document.getElementById('button').dispatchEvent(new Event('reveal'));
    played=!played;
    
  }

  function handleButton(e){
    if(!autoPlaying){
      if(e.target.innerHTML.indexOf('Play')!==-1){
        e.target.innerHTML = 'Reveal Chord';
      }else{
        e.target.innerHTML = 'Play Chord';
      }
    }else{
      document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
      e.target.innerHTML = 'Pause';
    }
  }


  function octaveShift(stuff){
    //for later
  }

  function applyInversion(chord){
    if(playedChord.indexOf("7")!==-1){
      //case for 7ths
    }else{
      //triads
      var inversion = Math.floor(Math.random()*3);
      switch (inversion) {
        case 0:
          return chord;
          break;
        
        case 1:
          chord[0] = chord[0].substring(0,chord[0].length-1)+(parseInt(chord[0].charAt(chord[0].length-1))+1);
          if(Math.random()>0.5){
            chord[2] = chord[2].substring(0,chord[2].length-1)+(parseInt(chord[2].charAt(chord[2].length-1))+1);
          }
          playedChord += ", 1st inversion"
          return chord;
          break;

        case 2:
          chord[2] = chord[2].substring(0,chord[2].length-1)+(parseInt(chord[2].charAt(chord[2].length-1))-1);
          playedChord += ", 2nd inversion"
          return chord;
          break;

        default:
          break;
      }
    }
  }

  function generateRandChord(){
    var keytitle = document.getElementById('key').textContent;
    
    var chosenkey = keytitle.substring(5);
    if(chosenkey==='Any Key >'||chosenkey==='t a key>'){
      chosenkey = keys[Math.floor(Math.random()*15)];
    }else{
      chosenkey = chosenkey.substring(0,chosenkey.length-2);
    }

    if(chosenkey.charAt(chosenkey.length-1)===' '){
      chosenkey = chosenkey.substring(0,1);
    }

    var allowedChords = [];

    for (let index = 1; index < 8; index++) {
      const element = document.getElementById('t'+index.toString());
      if(element.className.indexOf('unselected')==-1){
        allowedChords.push(index-1);
      }
    }

    if(allowedChords.length==0){
      playedChord= "No chords selected!";
      return [];
    }

    var selectedChord = triads[allowedChords[Math.floor(Math.random()*allowedChords.length)]];

    playedChord = chosenkey + " " + selectedChord;
    
    //console.log(chosenkey);
    //console.log(selectedChord);

    return (chordData["Triads"][chosenkey][selectedChord]).slice();
    

    
  }

  function playChord(chord){
    var instrument = document.getElementById("instrument").textContent.substring(12);
    instrument = instrument.substring(0,instrument.length-2);
    switch (instrument) {
      case "Piano":
        piano.triggerAttackRelease(chord,"2n");
        break;
      
      case "Guitar":
        guitar.triggerAttackRelease(chord,"2n");
        break;

      case "Synth":
        synth.triggerAttackRelease(chord,"2n");
        break;

      default:
        synth.triggerAttackRelease(chord,"2n");
        break;
    }
  }


  function setDelay(e){
    var num = e.target.value;
    if(num===""){
      num = 0;
    }else{
      num = parseFloat(num);
      if(num<0){
        num=0;
        e.target.value = 0;
      }
    }
    num = Math.floor(num*1000);
    autoPlayerReady = num!==0;
    if(autoPlayerReady){
      document.getElementById('button').innerHTML = "Start Playing Chords";
    }else{
      stopAutoPlayer(e);
      autoPlayerReady = false;
      played = false;
      document.getElementById('button').innerHTML = "Play Chord";
    }
    delay = num;
  }

  //-------Globals--------------

  const keys = ['C','G','D','A','E','B','Cb','F#','Gb','C#','Db','Ab','Eb','Bb','F'];
  const triads = ['Imaj','II-','III-','IVmaj','Vmaj','VI-','VIIo'];


  //get elements
  const button = document.querySelector('.button');
  const delaytimer = document.getElementById('delaytimer');
  const dropdownTitle = document.querySelectorAll('.dropdown .title');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');
  const dropdownSelected = document.querySelectorAll('.dropdown .selected');
  const dropdownUnSelected = document.querySelectorAll('.dropdown .unselected');
  const dropdownBatchSelect = document.querySelectorAll('.dropdown .batchselect');

   
  //bind listeners to these elements
  button.addEventListener('click', playnoise);
  button.addEventListener('reveal', handleButton);
  document.body.onkeyup = function(e){
    if(e.code === "Space"){
        playnoise(e);
    }
  }

  delaytimer.addEventListener('input', setDelay);

  dropdownTitle.forEach(dropdown => dropdown.addEventListener('click', toggleMenuDisplay));
  
  dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
  dropdownSelected.forEach(selected => selected.addEventListener('click',handleOptionSelected));
  dropdownUnSelected.forEach(unselected => unselected.addEventListener('click',handleOptionSelected));
  dropdownBatchSelect.forEach(batchselect => batchselect.addEventListener('click',handleOptionSelected));
  
  dropdownTitle.forEach(title=>title.addEventListener('change', handleTitleChange));

  var tbatch = true;
  var sbatch = true;
  var played = false;

  var playedChord = '';

  var delay = 0;
  var autoPlayerReady = false;
  var autoPlaying = false;
  var autoPlayId = 69;

  const chordData = JSON.parse('{"Triads": {"C": {"Imaj": ["C4","E4","G4"],"II-": ["D4","F4","A4"],"III-": ["E4","G4","B4"],"IVmaj": ["F4","A4","C5"],"Vmaj": ["G3","B3","D4"],"VI-": ["A3","C4","E4"],"VIIo": ["B3","D4","F4"]},"G": {"Imaj": ["G3","B3","D4"],"II-": ["A3","C4","E4"],"III-": ["B3","D4","F#4"],"IVmaj": ["C4","E4","G4"],"Vmaj": ["D4","F#4","A4"],"VI-": ["E4","G4","B4"],"VIIo": ["F#4","A4","C5"]},"D": {"Imaj": ["D4","F#4","A4"],"II-": ["E4","G4","B4"],"III-": ["F#4","A4","C#5"],"IVmaj": ["G4","B4","D5"],"Vmaj": ["A3","C#4","E4"],"VI-": ["B3","D4","F#4"],"VIIo": ["C#4","E4","G4"]},"A": {"Imaj": ["A3","C#4","E4"],"II-": ["B3","D4","F#4"],"III-": ["C#4","E4","G#4"],"IVmaj": ["D4","F#4","A4"],"Vmaj": ["E4","G#4","B4"],"VI-": ["F#4","A4","C#5"],"VIIo": ["G#4","B4","D5"]},"E": {"Imaj": ["E4","G#4","B4"],"II-": ["F#4","A4","C#5"],"III-": ["G#3","B3","D#4"],"IVmaj": ["A3","C#4","E4"],"Vmaj": ["B3","D#4","F#4"],"VI-": ["C#4","E4","G#4"],"VIIo": ["D#4","F#4","A4"]},"B": {"Imaj": ["B3","D#4","F#4"],"II-": ["C#4","E4","G#4"],"III-": ["D#4","F#4","A#4"],"IVmaj": ["E4","G#4","B4"],"Vmaj": ["F#4","A#4","C#5"],"VI-": ["G#4","B4","D#5"],"VIIo": ["A#3","C#4","E4"]},"Cb": {"Imaj": ["Cb3","Eb4","Gb4"],"II-": ["Db4","Fb4","Ab4"],"III-": ["Eb4","Gb4","Bb4"],"IVmaj": ["Fb4","Ab4","Cb4"],"Vmaj": ["Gb4","Bb4","Db5"],"VI-": ["Ab4","Cb4","Eb5"],"VIIo": ["Bb3","Db4","Fb4"]},"F#": {"Imaj": ["F#4","A#4","C#5"],"II-": ["G#4","B4","D#5"],"III-": ["A#3","C#4","E#4"],"IVmaj": ["B3","D#4","F#4"],"Vmaj": ["C#4","E#4","G#4"],"VI-": ["D#4","F#4","A#4"],"VIIo": ["E#4","G#4","B4"]},"Gb": {"Imaj": ["Gb4","Bb4","Db5"],"II-": ["Ab4","Cb4","Eb5"],"III-": ["Bb3","Db4","F4"],"IVmaj": ["Cb4","Eb4","Gb4"],"Vmaj": ["Db4","F4","Ab4"],"VI-": ["Eb4","Gb4","Bb4"],"VIIo": ["F4","Ab4","Cb4"]},"C#": {"Imaj": ["C#4","E#4","G#4"],"II-": ["D#4","F#4","A#4"],"III-": ["E#4","G#4","B#4"],"IVmaj": ["F#4","A#4","C#5"],"Vmaj": ["G#3","B#3","D#4"],"VI-": ["A#3","C#4","E#4"],"VIIo": ["B#3","D#4","F#4"]},"Db": {"Imaj": ["Db4","F4","Ab4"],"II-": ["Eb4","Gb4","Bb4"],"III-": ["F4","Ab4","C4"],"IVmaj": ["Gb4","Bb4","Db5"],"Vmaj": ["Ab3","C3","Eb4"],"VI-": ["Bb3","Db4","F4"],"VIIo": ["C3","Eb4","Gb4"]},"Ab": {"Imaj": ["Ab3","C4","Eb4"],"II-": ["Bb3","Db4","F4"],"III-": ["C4","Eb4","G4"],"IVmaj": ["Db4","F4","Ab4"],"Vmaj": ["Eb4","G4","Bb4"],"VI-": ["F4","Ab4","C5"],"VIIo": ["G4","Bb4","Db5"]},"Eb": {"Imaj": ["Eb4","G4","Bb4"],"II-": ["F4","Ab4","C5"],"III-": ["G3","Bb3","D4"],"IVmaj": ["Ab3","C4","Eb4"],"Vmaj": ["Bb3","D4","F4"],"VI-": ["C4","Eb4","G4"],"VIIo": ["D4","F4","Ab4"]},"Bb": {"Imaj": ["Bb3","D4","F4"],"II-": ["C4","Eb4","G4"],"III-": ["D4","F4","A4"],"IVmaj": ["Eb4","G4","Bb4"],"Vmaj": ["F4","A4","C5"],"VI-": ["G4","Bb4","D5"],"VIIo": ["A3","C4","Eb4"]},"F": {"Imaj": ["F4","A4","C5"],"II-": ["G4","Bb4","D5"],"III-": ["A3","C4","E4"],"IVmaj": ["Bb3","D4","F4"],"Vmaj": ["C4","E4","G4"],"VI-": ["D4","F4","A4"],"VIIo": ["E4","G4","Bb4"]}}}');

  const mySound = new sound("obi-wan-hello-there.mp3");
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.PolySynth().toDestination();
  const piano = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  const guitar = new Tone.Sampler({
    urls: {
      "C4": "C3.mp3",
      "D#4": "Ds3.mp3",
      "F#3": "Fs2.mp3",
      "A4": "A3.mp3",
    },
    release: 1,
    baseUrl: "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/guitar-acoustic/",
  }).toDestination();

  Tone.Transport.bpm.value = 120;

  const stuff = document.getElementById('stuff');
  //stuff.style.maxWidth = (screen.width-250)/4;