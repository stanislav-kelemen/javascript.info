let table = document.getElementById('bagua-table');
let editMode;


table.onclick = function (event) {
  if (editMode) return;

  let td = event.target.closest('td');
  if (!td) return;
  editMode = true;


  let textarea = document.createElement('textarea');
  textarea.value = td.innerHTML;

  textarea.className = 'edit';
  textarea.style.height = td.clientHeight + 'px';
  textarea.style.width = td.clientWidth + 'px';

  td.replaceWith(textarea);
  textarea.focus();


  let ok = document.createElement('button');
  let cancel = document.createElement('button');

  ok.className = 'ok';
  cancel.className = 'cancel';

  ok.style.top = textarea.getBoundingClientRect().bottom + 'px';
  ok.style.left = textarea.getBoundingClientRect().left + 'px';
  table.append(ok);

  cancel.style.top = textarea.getBoundingClientRect().bottom + 'px';
  cancel.style.left = textarea.getBoundingClientRect().left + ok.offsetWidth + 'px';
  table.append(cancel);


  ok.onclick = function () {
    td.innerHTML = textarea.value;
    textarea.replaceWith(td);
    editMode = false;
    ok.remove();
    cancel.remove();
  }

  cancel.onclick = function () {
    textarea.replaceWith(td);
    editMode = false;
    ok.remove();
    cancel.remove();
  }
};