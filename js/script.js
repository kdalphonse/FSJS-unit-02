/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

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
   
   if (end > student_list.length) {
      end = student_list.length;
   }

   const ul = document.querySelector('.student-list');
   
   const new_ul = document.createElement('ul');
   new_ul.className = 'student-list';

   const page_div = document.querySelector('.page');
   page_div.insertBefore(new_ul, ul);
   page_div.removeChild(ul);

   for( i = 0; i < student_list.length; i++) {
      if (i >= start && i <= end) {
         new_ul.appendChild(student_list[i]);
      }
   }   
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   /*
   1. Determine how many pages are needed for the list by dividing the
   total number of list items by the max number of items per page
   2. Create a div, give it the “pagination” class, and append it to the .page div
   3. Add a ul to the “pagination” div to store the pagination links
   4. for every page, add li and a tags with the page number text
   5. Add an event listener to each a tag. When they are clicked
   call the showPage function to display the appropriate page
   6. Loop over pagination links to remove active class from all links
   7. Add the active class to the link that was just clicked. You can identify that
   clicked link using event.target
   */

   const num_pages = Math.ceil(list.length / items_per_page);

   const pagination_div = document.createElement('div');
   pagination_div.className = 'pagination';

   const page_div = document.querySelector('.page');
   page_div.appendChild(pagination_div);

   const links_list = document.createElement('ul');
   pagination_div.appendChild(links_list);

   for (let i = 1; i <= num_pages; i++) {
      const li = document.createElement('li');
      const link = document.createElement('a');

      li.appendChild(link);
      link.textContent = i;
      link.addEventListener("click", () => { showPage(list, i) })

      links_list.appendChild(li);
   }




}

appendPageLinks(students);
showPage(students, 1);

// Remember to delete the comments that came with this file, and replace them with your own code comments.