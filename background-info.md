This was a challenging task for me because of the following reasons:

- My experience with React was a bit rusty after working almost two years extensively with Vue
- I recently learned Typescript basics and wanted put that to practice
- I recently tested Emotion's Styled Components approach, which I also wanted to use

I put a repository together with `create react app`'s typescript template and added linters, Emotion and testing libraries. I then researched about the technologies I wanted to use and found out that using React Hooks instead of class components seemed the best way to go.

I started with a form component, that eventually should work as a form generator by feeding it the right data as props. I'm always looking for patterns, i.e a component or a function, that I can share and reuse to keep my code DRY. I decided to prefix all my component names with a 'C' and created components for the input fields. Pretty quickly, I had to leave standard HTML-element structure behind to be able to control the radio inputs' checked value. I renamed the component to `CFormRadioGroup`.  I then figured, that it was best to split the form values from the form sections array, because I needed to access the values for the summary of the entered form data. This turned out to be a good decision and I could easily add the email and phone number fields.

My next task was form validation. I extended the `formValues` prop with more state properties, renamed it to `formState` and used Javascript's validation API to tell whether a field is valid or not. Once that worked, I added `touched` and `pristine` states so I could conditionally display error messages. To complete the validation I added custom error messages for the 'email' and 'phone' fields. Finally I added a progress bar and worked on the styling.

I'm pretty satisfied with my result, considering my limited experience with the technologies used. Although there's many things I would have liked to do differently:

- have more time to finish the styling of the summary and nice transitions (I wanted to remove outlines on focus when navigating with the mouse and use React's TransitionGroup add-on for transitions)
- create dynamic styles based on props and use Emotion's global styles component (couldn't get them to work)
- fix the radio button labels to also change the selection (no time anymore)
- a little cleaner and better structured code (I've used `index` too much, some components have their own file unnecessarily, but on the other parts of `CForm` should have been in their own file)
- be more experienced in Typescript (someone to teach me best practices would be awesome)
- more testing (I set it up, but didn't have time to write tests)

I'm looking forward to your feedback!