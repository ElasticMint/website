## Using Hugo

#### 1  Install Hugo

If you haven't already done so click here for [intial setup](/SETUP.md) of Hugo.

#### 2  Add a new Post
```
hugo new posts/my-first-post.md
```

Edit the newly created content file if you want. Now, start the Hugo server with drafts enabled:

```
 hugo server -D
```

Navigate to your new site at http://localhost:1313/.

#### 3  Publishing changes to Github pages 

Read here for guide : [Deployment of project pages from /docs folder on master branch](https://gohugo.io/hosting-and-deployment/hosting-on-github/#deployment-of-project-pages-from-docs-folder-on-master-branch)

```
cd partners  
hugo server -b https://www.elasticmint.com/ --appendPort=false --renderToDisk
```
This will publish static content to /docs/ folder. Push these changes to master and redirect to https://www.elasticmint.com


