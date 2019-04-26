/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-extend-native */
const faker = require('faker')

faker.locale = 'zh_CN'

Math.randomNum = function(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

Array.prototype.randomGetItem = function() {
  if (this.length === 0) return undefined
  return this[Math.floor(Math.random() * this.length)]
}

const blogs = []
const blogInfos = []
const comments = []
const tags = []
const users = []

// 博客信息
function BlogInfo(blogInfoID, title, time, views, words, summary, blogID, bgImg, ownTags, deleted, lastModified) {
  this.id = blogInfoID
  this.title = title
  this.time = time
  this.views = views
  this.words = words
  this.summary = summary
  this.blogID = blogID
  this.bgImg = bgImg
  this.tags = ownTags
  this.deleted = deleted
  this.lastModified = lastModified
}

// 博客
function Blog(blogID, content, blogInfo) {
  this.id = blogID
  this.content = content
  this.blogInfo = blogInfo
}

function Comment(commentID, commentContent, parentID, time, blogID, user, deleted) {
  this.id = commentID
  this.content = commentContent
  this.parentID = parentID
  this.time = time
  this.blogID = blogID
  this.user = user
  this.deleted = deleted
}

function Tag(tagID, tagName, tagImg, blogInfoIDs) {
  this.id = tagID
  this.tagName = tagName
  this.tagImg = tagImg
  this.blogInfoIDs = blogInfoIDs
}

function User(userID, userName, email, avatar) {
  this.id = userID
  this.userName = userName
  this.email = email
  this.avatar = avatar
}

function ImgUrl(small, medium, large) {
  this.small = small
  this.medium = medium
  this.large = large
}

// 生成用户
for (let i = 1; i < 10; i++) {
  const id = i.toString()
  const userName = faker.name.findName().replace(/\s+/g, '')
  const email = faker.internet.email()
  const imgID = Math.randomNum(0, 1000)
  const avatar = new ImgUrl('https://picsum.photos/100/100?image=' + imgID,
    'https://picsum.photos/500/500?image=' + imgID,
    'https://picsum.photos/1920/1080?image=' + imgID)
  users.push(new User(id, userName, email, avatar))
}
users.push({
  'id': '6a1c1e19949e6a9adf0b6876ca3073fb',
  'userName': 'zzy',
  'email': 'zzymailaddr@gmail.com',
  'avatar': new ImgUrl('https://picsum.photos/100/100?image=' + Math.randomNum(0, 1000),
    'https://picsum.photos/500/500?image=' + Math.randomNum(0, 1000),
    'https://picsum.photos/1920/1080?image=' + Math.randomNum(0, 1000))
})

const tagNames = ['随笔', '技术', '前端', 'Unity', '后台', '文学', '热点', 'shit', '电影', '小说', '电视剧', '美食']
// 生成标签
for (let i = 1; i <= tagNames.length; i++) {
  const id = i.toString()
  const tagName = tagNames[i - 1]
  const imgID = Math.randomNum(0, 1000)
  const tagImg = new ImgUrl('https://picsum.photos/200/200?image=' + imgID,
    'https://picsum.photos/500/500?image=' + imgID,
    'https://picsum.photos/1920/1080?image=' + imgID)
  tags.push(new Tag(id, tagName, tagImg, []))
}

for (let i = 1; i < 50; i++) {
  const blogInfoID = i.toString()
  const blogID = (i + 100).toString()

  // 生成博客列表和博客
  const title = faker.lorem.sentence()
  const time = faker.date.past()
  const views = faker.random.number({ 'min': 1000, 'max': 2000 })
  const content = faker.lorem.paragraphs(faker.random.number({ 'min': 10, 'max': 20 }))
  const summary = content.slice(0, 100)
  const words = content.length
  const imgID = Math.randomNum(0, 1000)
  const imgUrl = new ImgUrl('https://picsum.photos/200/200?image=' + imgID,
    'https://picsum.photos/500/500?image=' + imgID,
    'https://picsum.photos/1920/1080?image=' + imgID)

  const ownTags = []
  const ownTagsCount = Math.randomNum(0, 3)
  for (let i = 0; i < ownTagsCount; i++) {
    const index = Math.randomNum(0, tags.length - 1)
    if (ownTags.includes(tags[index])) {
      i--
      continue
    }
    tags[index].blogInfoIDs.push(blogInfoID)
    ownTags.push(tags[index])
  }
  const blogInfo = new BlogInfo(blogInfoID, title, time, views, words, summary, blogID, imgUrl, ownTags, false, time)
  blogs.push(new Blog(blogID, content, blogInfo))
  blogInfos.push(blogInfo)

  // 生成评论
  const commentTemps = []
  for (let j = i * 1000; j <= i * 1000 + 30; j++) {
    const commentContent = faker.lorem.sentences()
    const parentItem = commentTemps.randomGetItem()
    const parentID = Math.random() >= 0.5 ? -1 : (parentItem === undefined ? -1 : parentItem.id)
    const user = users.randomGetItem()
    let time = faker.date.past()
    while (parentItem !== undefined && parentID === parentItem.id && time <= parentItem.time) {
      time = faker.date.past()
    }
    commentTemps.push(new Comment(j.toString(), commentContent, parentID, time, blogID, user, false))
  }
  commentTemps.forEach((item) => {
    comments.push(item)
  })
}

{
  // 生成留言
  const commentTemps = []
  for (let i = 100000; i < 100000 + 1000; i++) {
    const commentContent = faker.lorem.sentences()
    const parentItem = commentTemps.randomGetItem()
    const parentID = Math.random() >= 0.5 ? -1 : (parentItem === undefined ? -1 : parentItem.id)
    const user = users.randomGetItem()
    let time = faker.date.past()
    while (parentItem !== undefined && parentID === parentItem.id && time <= parentItem.time) {
      time = faker.date.past()
    }
    commentTemps.push(new Comment(i.toString(), commentContent, parentID, time, (-1).toString(), user))
  }
  commentTemps.forEach((item) => {
    comments.push(item)
  })
}

function generate() {
  return {
    'blogs': blogs,
    'blog-infos': blogInfos,
    'comments': comments,
    'users': users,
    'tags': tags
  }
}

// 如果你要用json-server的话，就需要export这个生成fake data的function
module.exports = generate
