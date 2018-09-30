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

//生成用户
for (let i = 1; i < 10; i++) {
    let id = i;
    let userName = faker.name.findName();
    let email = faker.internet.email();
    let user = {
        "id":id,
        "userName":userName,
        "email":email,
    };
    users.push(user);
}
users.push({
    "id":"7c0412670bc5428fef4571706707471e",
    "userName":"zzy",
    "email":"zzymailaddr@gmail.com",
});

const tagNames = ["随笔","技术","前端","Unity","后台","文学","热点","shit","电影","小说","电视剧","美食"]
//生成标签
for(let i = 1;i<=tagNames.length;i++){
    let id = i;
    let tagName = tagNames[i-1];
    let blogInfoIDs = [];
    let tag = {
        "id":id,
        "tagName":tagName,
        blogInfoIDs : blogInfoIDs,
    };
    tags.push(tag);
}

for (let i = 1; i < 50; i++) {
    //生成评论
    let commentContent = faker.lorem.sentences();
    let commentTemps = [];
    for (var j = i*1000; j <= i*1000+30; j++) {
        let parentItem = commentTemps.randomGetItem();
        let parentID = Math.random() >= 0.5 ? null : (parentItem===undefined ? null : parentItem.id);
        let user = users.randomGetItem();
        let time = faker.date.past();
        let comment = {
            "id":j,
            "content":commentContent,
            "parentID":parentID,
            "time": time,
            "user": user,
        };
        commentTemps.push(comment);
    }
    commentTemps.forEach((item)=>{
        comments.push(item);
    });

    //生成博客列表和博客
    let blogInfoID = i;
    let blogID = i + 100;
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

    let blogInfo = {
        "id": blogInfoID,
        "title": title,
        "time": time,
        "views": views,
        "words": words,
        "summary": summary,
        "blogID": blogID,
        "imgUrl":imgUrl,
        "tags":ownTags,
    };
    let blog = {
        "id": blogID,
        "title": title,
        "time": time,
        "views": views,
        "words": words,
        "content": content,
        "comments": commentTemps,
        "imgUrl":imgUrl,
        "tags":ownTags,
    };
    blogs.push(blog);
    blogInfos.push(blogInfo);
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