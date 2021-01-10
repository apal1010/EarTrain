
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
    const menu = dropdown.querySelectorAll('.menu');
    const icon = dropdown.querySelectorAll('.fa-angle-right');
  
    menu.forEach(men=>toggleClass(men,'hide'));
    icon.forEach(arrow=>toggleClass(arrow,'rotate-90'));
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
      checkbatch(e.target.id.charAt(0));
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
  
    result.innerHTML = 'The result is: ' + e.target.textContent;
  }
  
  //get elements
  const dropdownTitle = document.querySelectorAll('.dropdown .title');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');
  const dropdownSelected = document.querySelectorAll('.dropdown .selected');
  const dropdownUnSelected = document.querySelectorAll('.dropdown .unselected');
  const dropdownBatchSelect = document.querySelectorAll('.dropdown .batchselect');

   
  //bind listeners to these elements
  dropdownTitle.forEach(dropdown => dropdown.addEventListener('click', toggleMenuDisplay));
  
  dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
  dropdownSelected.forEach(selected => selected.addEventListener('click',handleOptionSelected));
  dropdownUnSelected.forEach(unselected => unselected.addEventListener('click',handleOptionSelected));
  dropdownBatchSelect.forEach(batchselect => batchselect.addEventListener('click',handleOptionSelected));
  
  dropdownTitle.forEach(title=>title.addEventListener('change', handleTitleChange));

  var tbatch = false;
  var sbatch = false;

  const stuff = document.getElementById('stuff');
  stuff.style.maxWidth = (screen.width-250)/4;