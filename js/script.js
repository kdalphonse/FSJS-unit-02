/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

const items_per_page = 10;  // number of students to display per page
let students = document.querySelectorAll('.student-item'); // list of students on the page

/*** 
   Only display students for the current 'page', hide the rest
***/

function showPage(student_list, page, filtered) {
   const start = (page - 1) * items_per_page // index of first student on the page
   let end = page * items_per_page - 1       // index of last student on the page
   
   for( let i = 0; i < student_list.length; i++) {
      if (!filtered || student_list[i].style.display === '') {
      const show = i >= start && i <= end;
      student_list[i].style.display = show ? '' : 'none';
      }
   }   
}

function showFilteredPage(student_list, page) {
   let num_found = 0;
   
   for( let i = 0; i < student_list.length; i++) {
      if (student_list[i].style.display === '') {
         const show = num_found < items_per_page;
         student_list[i].style.display = show ? '' : 'none';
         num_found++;
      }
   }   
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
   }   
}
/*** 
   Add pagination 'buttons' and functionality.
***/

const appendPageLinks = (list) => {
   const num_pages = Math.ceil(list.length / items_per_page);

   // create a div for the pagination buttons
   const pagination_div = document.createElement('div');
   pagination_div.className = 'pagination';

   // add an ordered list to the pagination div
   const button_list = document.createElement('ul');
   pagination_div.appendChild(button_list);

   // add the paginatin div to the page
   const page_div = document.querySelector('.page');
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

         showPage(list, i);
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
      if (filterValue === '') {
         showPage(students,1);
      }
      else {
         filterList(students, filterValue);
         showFilteredPage(students, 1);
      }
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

appendSearch();
appendPageLinks(students);
showPage(students, 1); // show the first page by default
