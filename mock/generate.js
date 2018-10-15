let faker = require('faker');

faker.locale = "zh_CN";

Math.randomNum = function(minNum, maxNum) {
    switch (arguments.length) {
    case 1:
        return parseInt(Math.random() * minNum + 1, 10);
    case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
        return 0;
    }
};

Array.prototype.randomGetItem = function(){
    if(this.length===0) return undefined;
    return this[Math.floor(Math.random()*this.length)];
};

let blogs = [];
let blogInfos = [];
let comments = [];
let tags = [];
let users = [];

//博客信息
function BlogInfo(blogInfoID,title,time,views,words,summary,blogID,imgUrl,ownTags){
    this.id = blogInfoID;
    this.title = title;
    this.time = time;
    this.views = views;
    this.words = words;
    this.summary = summary;
    this.blogID = blogID;
    this.imgUrl = imgUrl;
    this.tags = ownTags;
}

//博客
function Blog(blogID,title,time,views,words,content,imgUrl,ownTags){
    this.id = blogID;
    this.title = title;
    this.time = time;
    this.views = views;
    this.words = words;
    this.content = content;
    this.imgUrl = imgUrl;
    this.tags = ownTags;
}

function Comment(commentID,commentContent,parentID,time,blogID,user){
    this.id = commentID;
    this.content = commentContent;
    this.parentID = parentID;
    this.time = time;
    this.blogID = blogID;
    this.user = user;
}

function Tag(tagID,tagName,tagImg,blogInfoIDs){
    this.id = tagID;
    this.tagName = tagName;
    this.tagImg = tagImg;
    this.blogInfoIDs = blogInfoIDs;
}

function User(userID,userName,email,avatar){
    this.id = userID;
    this.userName = userName;
    this.email = email;
    this.avatar = avatar;
}

//生成用户
for (let i = 1; i < 10; i++) {
    let id = i.toString();
    let userName = faker.name.findName().replace(/\s+/g,"");
    let email = faker.internet.email();
    let avatar = 'https://picsum.photos/100/100?image='+Math.randomNum(0,1000);
    users.push(new User(id,userName,email,avatar));
}
users.push({
    "id":"7c0412670bc5428fef4571706707471e",
    "userName":"zzy",
    "email":"zzymailaddr@gmail.com",
    "avatar" : 'https://picsum.photos/100/100?image='+Math.randomNum(0,1000),
});

const tagNames = ["随笔","技术","前端","Unity","后台","文学","热点","shit","电影","小说","电视剧","美食"]
//生成标签
for(let i = 1;i<=tagNames.length;i++){
    let id = i.toString();
    let tagName = tagNames[i-1];
    let imgID = Math.randomNum(0,1000);
    let tagImg = {
        small : 'https://picsum.photos/200/200?image='+imgID,
        medium : 'https://picsum.photos/500/500?image='+imgID,
        large : 'https://picsum.photos/1920/1080?image='+imgID,

    };
    tags.push(new Tag(id,tagName,tagImg,[]));
}

for (let i = 1; i < 50; i++) {
    let blogInfoID = i.toString();
    let blogID = (i + 100).toString();

    //生成博客列表和博客
    let title = faker.lorem.sentence();
    let time = faker.date.past();
    let views = faker.random.number({ 'min': 1000, 'max': 2000, });
    let content = faker.lorem.paragraphs(faker.random.number({ 'min': 10, 'max': 20, }));
    let summary = content.slice(0, 100);
    let words = content.length;
    let imgUrl = 'https://picsum.photos/1920/500?image='+Math.randomNum(0,1000);

    let ownTags = [];
    let ownTagsCount = Math.randomNum(0,3);
    for(let i = 0;i<ownTagsCount;i++){
        let index  = Math.randomNum(0,tags.length-1);
        if(ownTags.includes(tags[index])){
            i--;
            continue;
        }
        tags[index].blogInfoIDs.push(blogInfoID);
        ownTags.push(tags[index]);
    }
    blogs.push(new Blog(blogID,title,time,views,words,content,imgUrl,ownTags));
    blogInfos.push(new BlogInfo(blogInfoID,title,time,views,words,summary,blogID,imgUrl,ownTags));

    //生成评论
    let commentTemps = [];
    for (let j = i*1000; j <= i*1000+30; j++) {
        let commentContent = faker.lorem.sentences();
        let parentItem = commentTemps.randomGetItem();
        let parentID = Math.random() >= 0.5 ? -1 : (parentItem===undefined ? -1 : parentItem.id);
        let user = users.randomGetItem();
        let time = faker.date.past();
        while(parentItem!==undefined && parentID === parentItem.id && time<= parentItem.time){
            time = faker.date.past();
        }
        commentTemps.push(new Comment(j.toString(),commentContent,parentID,time,blogID,user));
    }
    commentTemps.forEach((item)=>{
        comments.push(item);
    });
}

{
    //生成留言
    let commentTemps = [];
    for (let i = 100000; i < 100000+1000; i++) {
        let commentContent = faker.lorem.sentences();
        let parentItem = commentTemps.randomGetItem();
        let parentID = Math.random() >= 0.5 ? -1 : (parentItem===undefined ? -1 : parentItem.id);
        let user = users.randomGetItem();
        let time = faker.date.past();
        while(parentItem!==undefined && parentID === parentItem.id && time<= parentItem.time){
            time = faker.date.past();
        }
        commentTemps.push(new Comment(i.toString(),commentContent,parentID,time,(-1).toString(),user));
    }
    commentTemps.forEach((item)=>{
        comments.push(item);
    });
}

function generate() {
    return {
        "blogs": blogs,
        "blog-infos": blogInfos,
        "comments":comments,
        "users":users,
        "tags":tags,
    };
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generate;