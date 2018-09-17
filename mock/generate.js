let faker = require('faker');

function generate() {
    let blogs = [];
    let blogInfos = [];

    for (let i = 1; i < 50; i++) {
        let blogInfoID = i;
        let blogID = i + 100;
        let commentID = i + 1000;
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
            "commentID": commentID,
        };

        blogs.push(blog);
        blogInfos.push(blogInfo);
    }

    return {
        "blogs": blogs,
        "blog-infos": blogInfos
    }
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generate