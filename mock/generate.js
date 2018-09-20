let faker = require('faker');

faker.locale = "zh_CN";

Array.prototype.randomGetItem = function(){
    if(this.length===0) return undefined;
    return this[Math.floor(Math.random()*this.length)];
};

let blogs = [];
let blogInfos = [];
let comments = [];

let users = [];

//生成用户
for (let i = 1; i < 10; i++) {
    let id = i;
    let userName = faker.name.findName();
    let email = faker.internet.email();
    let user = {
        "id":id,
        "userName":userName,
        "email":email
    };
    users.push(user);
}
    users.push({
        "id":"7c0412670bc5428fef4571706707471e",
        "userName":"zzy",
        "email":"zzymailaddr@gmail.com"
    });

for (let i = 1; i < 50; i++) {
    //生成评论
    let commentContent = faker.lorem.sentences();
    let commentTemps = [];
    for (var j = i*1000; j <= i*1000+30; j++) {
        let parentItem = commentTemps.randomGetItem();
        let parentID = Math.random() >= 0.5 ? null : (parentItem===undefined ? null : parentItem.id);
        let user = users.randomGetItem();
        let comment = {
            "id":j,
            "content":commentContent,
            "parentID":parentID,
            "user": user
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
    let views = faker.random.number({ 'min': 1000, 'max': 2000 });
    let content = faker.lorem.paragraphs(faker.random.number({ 'min': 10, 'max': 20 }));
    let summary = content.slice(0, 200);
    let words = content.length;
    let blogInfo = {
        "id": blogInfoID,
        "title": title,
        "time": time,
        "views": views,
        "words": words,
        "summary": summary,
        "blogID": blogID,
    };
    let blog = {
        "id": blogID,
        "title": title,
        "time": time,
        "views": views,
        "words": words,
        "content": content,
        "comments": commentTemps,
    };
    blogs.push(blog);
    blogInfos.push(blogInfo);
}

function generate() {
    return {
        "blogs": blogs,
        "blog-infos": blogInfos,
        "comments":comments,
        "users":users
    }
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generate