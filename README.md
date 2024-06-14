This is the starter code for Code4Community's technical challenge for Fall 2024. 
For more detailed information about each of the parts of this starter code, check out the [`INFO.md`](INFO.md) file

## Prerequisites

If you don't have them already, you'll need to install Node.js/NPM and Git:
- Node.js + NPM - install [here](https://nodejs.org/en/download/package-manager) (we highly recommend using at least Node 18.0.0 + NPM 8.6.0)
   - You can choose to install via the command line under "Package Manager", or download an installer under "Prebuilt Installer"
   - Node and NPM are installed together
- Git - install [here](https://git-scm.com/downloads)

## Setup Instructions

1. Clone this repo on to your computer. You can do so with the [desktop app](https://desktop.github.com/), or in a terminal with the following:
```
git clone https://github.com/huang0h/c4c-challenge-fall-2024.git
```
2. In a terminal, run `npm install` **at the root of this project** to install the required packages
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website
    
    4a. The backend will be available at `http://localhost:4000`

## READ.ME
Instructions: In terminal run 'npm install' then 'npm run dev'. From there click 'http://localhost:3000' to view the website


● A high-level overview of the application

This application allows for a user to add a partner organization that Code 4 Community has worked with. From there the user can view previously added partner organizations or add a new partner by clicking the button named "add partner info". By clicking that button users can enter in the partner organization's name, description, partner logo source, and if C4C is still actively working with the organization.

● An explanation of any design decisions that you made

Partner tile was altered to display each peice of information that was given by the user, additionally there is an if statement that deterines if the active checkbox has been checked. If so the text would write "active" in green if not then the text will display "inactive" in red. 

In server.js a function was added to handle the delete request. It starts as the code specifies the route and object to handle delete requests with partnerKey as the route parameter meanng it will capture the value within the parameter (which is a partner) Then that information into a constant named partnerKeyToDelete. With that the code checks if the partner actually exists, if so it will delete the partner and if not it will message "partner not found". To add a new partner, the code in server.js first sets up a root that listens for POST requests through the add-partner URL which is called in Dashboard.jsx. Then it stores the new partner info in a constant called newPartner and from there creates a new partner. 

In Dashboard.jsx there are three constants that use the useState function, one handles in the new partner input, another handles the button that displays the info to add a partner. There are three major constants that handle the input, submit, and delete. With handleInputChange, the function keeps the original data and adds the new info with a name and value. handleDelete and handleSubmit call the method that was created in server.jsx and either deletes or adds a partner. Further down the input is taken care of by creating many inputs that handle each input that is needed to add a partner. handleInputChange,  handleSubmit, and handleDelete are all called at approiate times. At the end the code maps the partners into the PartnerTile to be properly formatted. 

App.css is used to style and formate the input functions and all of the partner organizations.

○ Did you learn anything from this project? If so, how might you have done this
differently knowing what you know now?

I got a deeper understanding of coding through HTML, CSS, React, and Java Script. I also learned more about APIs and JSONs. I ran into issues with formatting which was fixed through trial and error. I also had trouble organizing code but it was resolved through research. 

