import os

#This is a useful tool for updating all of the static pages in bulk
path ="C:/My Web Sites/bitbayNEWEST/bitbay.market"
#we shall store all the file names in this list
filelist = []

for root, dirs, files in os.walk(path):
    for file in files:
        #append the file name to the list
        filelist.append(os.path.join(root,file))

#print all the file names
x=0

rep='forum-archive/index.htmlt/how-to-buy-anything-using-the-buy-sell-anything-template/1128'
repst='forum-archive/t/how-to-buy-anything-using-the-buy-sell-anything-template/1128.html'
for name in filelist:
    dots=""    
    with open(name) as r:
      text = r.read()
      r.close()
    if rep in text:
        #for s in name:
        #    if s=="\\":
        #        dots+="."
        print name
        #print dots
        x+=1
        text=text.replace(rep,dots+repst)
        with open(name, "w") as w:
            w.write(text)
            w.close()
print x