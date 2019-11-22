/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

const items_per_page = 10;  // number of students to display per page
let all_students = document.querySelectorAll('.student-item'); // list of students on the page

/*** 
   Only display students for the current 'page', hide the rest
   Display a "No results" message if the list is empty.
***/

function showPage(student_list, page, filtered) {
   const start = (page - 1) * items_per_page // index of first student on the page
   let end = page * items_per_page - 1       // index of last student on the page
   
   for( let i = 0; i < student_list.length; i++) {
      const show = i >= start && i <= end;
      student_list[i].style.display = show ? '' : 'none';
   }   

   showHideNoneFound(student_list);
}

/***
   Only select students whose names match the filter
 ***/
function filterList(student_list, filter) {
   let new_student_list = [];

   for( let i = 0; i < student_list.length; i++) {
      // students name is in the h3 element of the div inside the list item.
      const student_name = student_list[i].querySelector('div h3').textContent;

      const show = student_name.indexOf(filter) !== -1;
      student_list[i].style.display = show ? '' : 'none';
      
      if (show) {
         new_student_list.push(student_list[i]);
      }
   }   

   return new_student_list;
}
/*** 
   Add pagination 'buttons' (if needed) and functionality.
***/

const appendPageLinks = (student_list) => {
   const num_pages = Math.ceil(student_list.length / items_per_page);

   const page_div = document.querySelector('.page');
   // remove the old pagination elements if they exist
   const old_pagination_div = document.querySelector('.pagination');
   if (old_pagination_div !== null && old_pagination_div !== undefined) {
      page_div.removeChild(old_pagination_div);
   }

   if (num_pages <= 1) {
      return; // we don't need pagination if there's only one page
   }

   // create a new div for the pagination buttons
   const pagination_div = document.createElement('div');
   pagination_div.className = 'pagination';

   // add an unordered list to the pagination div
   const button_list = document.createElement('ul');
   pagination_div.appendChild(button_list);

   // add the paginatin div to the page
   page_div.appendChild(pagination_div);

   // create and add each individual pagination button to the list
   for (let i = 1; i <= num_pages; i++) {      
      const button = document.createElement('a');

      button.textContent = i;
      if (i === 1) {
         button.className = 'active'; // make the first one active by default
      }

      // when clicked, change the 'active' button and show the related page
      button.addEventListener("click", (event) => { 
         // find and de-activate currently active button
         let active_button = button_list.querySelector('a.active');
         active_button.className = '';

         // find and activate new active button
         event.target.className = 'active';

         showPage(student_list, i);
      })

      const li = document.createElement('li');
      li.appendChild(button);
      button_list.appendChild(li);
   }
}

/***
   Add a search input field and button
***/

function appendSearch() {

   // search input/prompt
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';

   // search button
   const button = document.createElement('button');
   button.textContent = 'Search';
   button.addEventListener('click', (event) => { 
      const filterValue = input.value;
      let display_list = all_students;
      if (filterValue !== '') {
         display_list = filterList(all_students, filterValue);
      }
      appendPageLinks(display_list);
      showPage(display_list, 1);
   });

   // create a div to hold the input and button
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';

   // append prompt and button to the div
   searchDiv.appendChild(input);
   searchDiv.appendChild(button);

   // append the div to the header
   const header = document.querySelector('.page-header');
   header.appendChild(searchDiv);
}

/***
 Display or remove a 'No results' message as applicabl for the given list of students.  
***/
function showHideNoneFound(student_list) {
   const page = document.querySelector('.page');
   if (student_list.length <= 0) {
      const div = document.createElement('div');
      div.className = 'js_NoneFound';
      const header = document.createElement('h3');
      header.textContent = 'No results';

      div.appendChild(header);
      page.appendChild(div);
   }
   else {
      const div = page.querySelector('.js_NoneFound');
      if (div !== null && div !== undefined) {
         page.removeChild(div);
      }
   }
}

appendSearch();
appendPageLinks(all_students);
showPage(all_students, 1); // show the first page by default
