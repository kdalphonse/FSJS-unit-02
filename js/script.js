/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const items_per_page = 10;  // number of students to display per page
let students = document.querySelectorAll('.student-item'); // list of students on the page


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(student_list, page) {
   const start = (page - 1) * items_per_page
   let end = page * items_per_page - 1
   
   for( i = 0; i < student_list.length; i++) {
      const show = i >= start && i <= end;
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

appendPageLinks(students);
showPage(students, 1); // show the first page by default
