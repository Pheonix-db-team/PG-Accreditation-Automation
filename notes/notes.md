## Prop
- Pass var to components
## CSS in React
- Inline styling
    - JS obj
    - camelCase for syntax
    - ex background-color -> backgroundColor 

 < div style={{ backgroundColor: 'red' }}>   
- CSS styles sheet
create .css file
import./<path>/file_name.css
	-	in js <div	className ="<cname>"
	-	in css .<cname>{small - word	}
- CSS modules

## Shortcut
Rfce to auto fill vs code extenstion

## Events 
Same as HTML // camel case syntax

onclick -> onClick
`onclick={sayHi}`
event handler 
- Click
- Change 
- Mouseover 

---
## Firebase
Firebase => new project
Add web < / >
- Register app
Use SDK, run npm install firebase
Copy code snippet w. keys and paste in file below
src> config> [new file] => firebase.js
	- const app = initializeApp(firebaseConfig);
	Above to use all firebase service
	npm install  -g firebase-tools//g for global
// f(X)	 to set up authentication
import { getAuth } from "firebase/app";
import { initializeApp } from "firebase/app";
import {auth} from '../config/firebase'
// above acc to copy code file 

	