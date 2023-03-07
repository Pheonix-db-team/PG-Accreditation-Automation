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

## Cloud Firestore DB
-	Panel View
	Collections = Table of RDBMS
	Document-ID // Auto generate
	-	Field => entity Name
	-	Tag =>	Data structure
	-	Value =>	in that row

-	Code
	-	config folder> firebase.js
	 Import {getFirestore} 'firebase/firestore';
	export		const db= getFirestore(app);
	-	App.js
	// db obj
	Import {db} './config/firestore';
	//fetch data
	 Import {getDocs, collection} 'firebase/firestore';
	const[movieList,setMovieList] = useState([])
	const moviesCollectionRef = collection(db,"movies");// key is collection name

	// useEffect => run when start

	useEffect(()=>
	const getMovieList= async()=>{

		//Read data
		try{
			const data = await getDocs(
				moviesCollectionRef 
				);
				//better readabiloty
				const filter_data= data.docs.map((doc)=>({...doc.data(),id:doc.id}));
				console.log(data);
				console.log(precise_data);
			//set state to that data	
		const data= await getDocs()
		

		}
		catch(err){
			console.error(err);
		}
		setMoviesList(filter_data);
	},[]);

	
	-	Render data component
	{
		moviesList.map((movie)=>{
			<div>
				{movie.title}
			</div>
			})
	}
	-	 Firebase Data update
	[Link](https://firebase.google.com/docs/firestore/transaction-data-contention)