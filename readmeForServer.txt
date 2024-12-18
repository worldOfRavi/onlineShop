to enable cors(cross origin resource sharing).
app.use(cors({
    origin:"http://localhost:5174/",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))