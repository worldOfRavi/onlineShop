// register form elements
export const registerFormControl = [
    {
        name:"userName",
        label:"User Name",
        placeholder:"Enter your name",
        componentType:"input",
        type:"text"
    },
    {
        name:"email",
        label:"Email",
        placeholder:"Enter your email",
        componentType:"input",
        type:"email"
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Enter password",
        componentType:"input",
        type:"password"
    },
]


// login form elements
export const loginFormControl = [
    {
        name:"email",
        label:"Email",
        placeholder:"Enter your email",
        componentType:"input",
        type:"email"
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Enter password",
        componentType:"input",
        type:"password"
    },
]

// add product form elements

export const addProductFormElements = [
    {
        label:"Title",
        name:"title",
        componentType:"input",
        type:"text",
        placeholder:"Enter product title"
    },
    {
        label:"Description",
        name:"description",
        componentType:"textarea",
        placeholder:"Enter product description"
    },
    {
        label:"Category",
        name:"category",
        componentType:"select",
        options:[
            {id:'men', lable:"Men"},
            {id:"women",label:"Women"},
            {id:"kids",label:"Kids"},
            {id:"accessories",label:"Accessories"},
            {id:"footware",label:"Footware"},
            
        ],
    },
    {
       label:"Brand",
        name:"brand",
        componentType:"select",
        options:[
            {id:'nike', lable:"Nike"},
            {id:"addidas",label:"Addidas"},
            {id:"puma",label:"Puma"},
            {id:"levis",label:"Levis"},
            {id:"zara",label:"Zara"},
            {id:"h&m",label:"H&M"},
        ],
    },
    {
        label:"Price",
        name:"price",
        componentType:"input",
        type:"number",
        placeholder:"Enter product price"
    },
    {
        label:"Sale Price",
        name:"salePrice",
        componentType:"input",
        type:"number",
        placeholder:"Enter sale price (optional)"
    },
    {
        label:"Total Stock",
        name:"totalStock",
        componentType:"input",
        type:"number",
        placeholder:"Enter total stock"
    },

]