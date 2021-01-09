
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
  
  function handleOptionSelected(e){
    			
  
    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem = e.target.parentNode.parentNode.querySelector('.dropdown .title');
    const icon = e.target.parentNode.parentNode.querySelector('.dropdown .title .fa');

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

    if (e.target.className.indexOf('option') == -1){
      if(e.target.className.indexOf('unselected') !== -1){
        e.target.classList.replace('unselected','selected');
      }else{
        e.target.classList.replace('selected','unselected');
      }
      return;
    }
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

   
  //bind listeners to these elements
  dropdownTitle.forEach(dropdown => dropdown.addEventListener('click', toggleMenuDisplay));
  
  dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
  dropdownSelected.forEach(selected => selected.addEventListener('click',handleOptionSelected));
  dropdownUnSelected.forEach(unselected => unselected.addEventListener('click',handleOptionSelected));
  
  dropdownTitle.forEach(title=>title.addEventListener('change', handleTitleChange));

  const stuff = document.getElementById('stuff');
  stuff.style.maxWidth = (screen.width-250)/4;