'use strict';

const data = {};

const name = document.querySelector('#input-name');
const phone = document.querySelector('#input-phone');
const nameChecker = /([A-Z][a-z]{1,} )([A-Z][a-z]{1,} )?([A-Z][a-z]{1,})/;
const phoneChecker = /^(((380)?[0-9]{9})|(0[0-9]{9}))$/;
const labelName = document.querySelector('#label-name');
const labelPhone = document.querySelector('#label-phone')

name.onblur = function() {
  if (name.value.match(nameChecker)) {
    name.classList.add('correct');
  } else {
    name.classList.add('incorrect');
  }
}

name.onfocus = function() {
  if (name.classList.contains('incorrect')) {
    name.classList.remove('incorrect');
  } if (name.classList.contains('correct')) {
    name.classList.remove('correct');
  }
}

phone.onblur = function() {
  if (phone.value.match(phoneChecker)) {
    phone.classList.add('correct');
  } else {
    phone.classList.add('incorrect');
  }
}

phone.onfocus = function() {
  if (phone.classList.contains('incorrect')) {
    phone.classList.remove('incorrect');
  } if (phone.classList.contains('correct')) {
    phone.classList.remove('correct');
  }
}

const labelRegion = document.querySelector('#label-region');
const region = document.querySelector('#input-region');
const labelHometown = document.querySelector('#label-hometown');
const hometown = document.querySelector('#input-hometown');

region.addEventListener('change', function() {
  if (region.selectedIndex > 1) {
    labelHometown.classList.remove('hide');
    labelHometown.classList.add('show');
  }
  if (region.selectedIndex < 1) {
    labelHometown.classList.remove('show');
    labelHometown.classList.add('hide');
    return ;
  }

  let townsArr = region.options[region.selectedIndex].text.match(/[A-Z][a-z]{1,}/g, );
  townsArr.shift();

  townsArr.forEach(function(town) {
    let opt = document.createElement('option');
    opt.textContent = `${town}`;
    opt.setAttribute('value', `${town}`);
    hometown.append(opt);
  })

  let opt = document.createElement('option');
  opt.textContent = `Not in this list`;
  opt.setAttribute('value', `Empty`);
  hometown.append(opt);
})

const anon = document.querySelector('#input-anon');

anon.addEventListener('change', function() {
  if(anon.checked) {
    labelRegion.classList.remove('show');
    labelHometown.classList.remove('show');
    labelPhone.classList.remove('show');
    labelRegion.classList.add('hide');
    labelHometown.classList.add('hide');
    labelPhone.classList.add('hide');
  }
  if(!anon.checked) {
    labelRegion.classList.remove('hide');
    labelHometown.classList.remove('hide');
    labelPhone.classList.remove('hide');
    labelRegion.classList.add('show');
    labelHometown.classList.add('show');
    labelPhone.classList.add('show');
  }
})


const submit = document.querySelector('#feedback-form');

submit.addEventListener('submit', function(event) {
  event.preventDefault();

  if (anon.checked) {
    if (name.classList.contains('incorrect') || !name.value) {
    name.classList.add('incorrect');
    return ;
    } else {
      data[name.name] = name.value;
      console.log(data);
      return data;
    }
  } else {
    if (name.classList.contains('incorrect') || !name.value) {
      name.classList.add('incorrect');
      return ;
    }
    if (phone.classList.contains('incorrect') || !phone.value) {
      phone.classList.add('incorrect');
      return ;
    }

    data[name.name] = name.value;
    data[phone.name] = phone.value;

    if (region.selectedIndex === 0) {
      console.log(data);
      return data;
    } else {
      data[region.name] = region.value;

      if (hometown.selectedIndex === 0) {
        console.log(data);
        return data;
      } else {
        data[hometown.name] = hometown.value;
        console.log(data);
        return data;
      }
    }
  }
})

//Когда-нибудь вы научите меня не говнокодить, но это уже другая история :с
