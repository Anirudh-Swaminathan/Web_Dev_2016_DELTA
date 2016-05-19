#This is Huffman with file Handling
import Queue
code = [""]*128
class data:
    def __init__(self,data1,freq1):
        self.data = data1
        self.freq = freq1
        self.left = None
        self.right = None
    def __cmp__(self,other):
        return cmp(self.freq,other.freq)
q = Queue.PriorityQueue()

def encodeit(root,ch):
    if root is None:
        return
    if root.data != "@#$":
        print root.data+" : "+ch
        code[ord(root.data)] = ch
    encodeit(root.left,ch+"0")
    encodeit(root.right,ch+"1")

def executeTree(dataHe,freqHe,n):
    for i in range(n):
        q.put(data(dataHe[i],freqHe[i]))
    while (q.qsize()!=1):
        lefty = q.get()
        righty = q.get()
        top = data("@#$",lefty.freq+righty.freq)
        top.left = lefty
        top.right = righty
        q.put(top)
    temp = q.get()
    q.put(temp)
    encodeit(temp,"")
if __name__ == '__main__':
    filename = "huffman_data.txt"
    f = open('huffman_data.txt','r')
    a = f.read()
    print "The contents of "+filename+" is "+a
    p = len(a)
    t = [0]*128
    count = 0
    for i in range(p):
        t[ord(a[i])] += 1
    for i in range(128):
        if t[i]!=0:
            count+=1
    print "The number of distinct characters used is "+str(count)+"\n"
    letter=[]
    freq=[]
    n=count
    for i in range(128):
        if t[i]!=0:
            letter.append(chr(i))
            freq.append(t[i])
    for i in range(n):
        print "Frequency of "+str(letter[i])+" : "+str(freq[i])
    print "The codes are \n"
    executeTree(letter,freq,n)
    final = ""
    print "The encoded string for "+a+" is "
    for i in range(p):
        final+=code[ord(a[i])]
    print final
    
