
var isupdate = false;
var record = '';
var body = '';
var nnote =  '';

var srch = document.getElementById('search');
var tablediv = document.getElementById('tablediv');
var tableid = document.getElementById('tableid');
var reset = document.getElementById('clear');

var title = document.getElementById('title');
var note = document.getElementById('note');
var delet = document.getElementsByClassName('dltbn');



document.getElementById('form').addEventListener('submit',savefn);
srch.addEventListener('keyup',srchfunction);

tableid.addEventListener('click',fnview);
tableid.addEventListener('click',fndlt);
reset.addEventListener('click',resetAll);


function fndlt(e){
   
  if(e.target.className === 'dltbn'){
    if(confirm("are you sure to delete this iteam")){
      var tr = e.target.parentElement.parentElement;
      tableid.removeChild(tr);

      titlecount--;
      if(titlecount ===0){
        updatetable();
      }
    }
  }
}

function resetAll(){

  title.value = '';
  note.value = '';
  isupdate = false;
  trinsted = '';
  
}

window.onload = updatetable;

var titlecount = 0;
var trinsted = '';


function fnview(e){

  if(e.target.className === 'vw'){

    record  = e.target.parentElement.parentElement;
    nnote = record.firstChild;
    title.value = nnote.firstChild.textContent;
    note.value = nnote.lastChild.textContent;
    isupdate = true;

    

  }
}

function srchfunction(e){
    var searchtext = e.target.value.toLowerCase();
    console.log(searchtext);
    

    // we created and gave a class name as 'item' for tr tag before.
    //now we select those  tr tags (newly created all tr tags by user entering details) 
    var list = tableid.getElementsByClassName('item');

    //convert to array
    var listarr = Array.from(list);
    listarr.forEach(function(item){
      var noteTitle = item.firstChild.textContent;

      if(noteTitle.toLowerCase().startsWith(searchtext) ){
        item.style.display='';
      }
      else{
        item.style.display = 'none';
      }

    });

}



function updatetable()
{
   if(titlecount>0)
   {
     tablediv.style.display = '';
     
    if(isupdate){
      nnote.firstChild.textContent =  title.value;
        nnote.lastChild.textContent= note.value;
        isupdate = false;
        titlecount -- ;

    }
    else{
      tableid.appendChild(trinsted);
    }


   }
   else{
    tablediv.style.display ='none';
   }
}

function savefn(e)
{
    e.preventDefault();
    
    if(title.value ===''|| note.value === '')
    {
      alert("enter all data");

    }
    else{

        var maintr = document.createElement('tr');
        maintr.className = 'item';
        

        var titletd = document.createElement('td');
        
        titletd.appendChild(document.createTextNode(title.value));
        

        var span = document.createElement('span');
        span.appendChild(document.createTextNode(note.value));
        titletd.appendChild(span);

        var viewtd = document.createElement('td');
        var viewbtn = document.createElement('button');
        viewbtn.className = 'vw';
        viewbtn.appendChild(document.createTextNode('view'));
        viewtd.appendChild(viewbtn);

        var dltetd = document.createElement('td');
        var dltbtn = document.createElement('button');
        dltbtn.className ='dltbn';

        dltbtn.appendChild(document.createTextNode('delete'));
        dltetd.appendChild(dltbtn);
       
        maintr.appendChild(titletd);
        maintr.appendChild(viewtd);
        maintr.appendChild(dltetd);

        titlecount ++;
        trinsted = maintr;

        updatetable();
        resetAll();






        

    
    }
}