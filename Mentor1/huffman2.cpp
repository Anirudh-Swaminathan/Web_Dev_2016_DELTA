//This is Huffman on ASCII text files
#include <iostream>
#include <fstream>
#include <strings.h>
#include <queue>
#include <stdlib.h>
using namespace std;
string code[128];
struct dataCh
{
    char data;
    unsigned freq;
    dataCh *left, *right;
    dataCh(char data1,unsigned freq1)
    {
        this->data = data1;
        this->freq = freq1;
        this->left = NULL;
        this->right = NULL;
    }
};
struct compare
{
    bool operator() (dataCh *l,dataCh *r)
    {
        return l->freq>r->freq;
    }
};
void encodeIt(dataCh *root,string ch)
{
    if(!root)
        return;
    if(root->data != '@')
    {
        cout<<root->data<<" : "<<ch<<"\n";
        code[root->data] = ch;
        return;
    }
    encodeIt(root->left,ch+"0");
    encodeIt(root->right,ch+"1");
}
void executeTree(char dataHe[],unsigned freqHe[],int n)
{
    dataCh *top;
    priority_queue<dataCh*,vector<dataCh*>,compare> q;
    for(int i=0; i<n; ++i)
        q.push(new dataCh(dataHe[i],freqHe[i]));
    while(q.size()!=1)
    {
        dataCh *lefty,* righty;
        lefty = q.top();
        q.pop();
        righty = q.top();
        q.pop();
        top = new dataCh('@',lefty->freq + righty->freq);
        top->left = lefty;
        top->right = righty;
        q.push(top);
    }
    encodeIt(q.top(),"");
    while(!q.empty())
        q.pop();
}
int main()
{
    char a[101];
    int indes = 0;
    char chair;
    fstream f;
    char filename[101];
    strcat(filename,"huffman_data.txt");
    if(!(strlen(filename))>0)
    {
        cerr<<"\nFilename Error";
    }
    f.open(filename,ios::in);
    if(!f)
    {
        cerr<<"\n404 File Not Found";
        exit(1);
    }
    while(f.get(chair))
    {
        a[indes++] = chair;
    }
    a[indes++] = '\0';
    f.close();

    cout<<"\nThe contents of "<<filename<<" is "<<a;
    int p = strlen(a);
    int t[128] = {0};
    for(int i=0; i<p; ++i)
    {
        t[a[i]]++;
    }
    int countit = 0;
    for(int i=0; i<128; ++i)
    {
        if(t[i]!=0) countit++;
    }
    cout<<"\nThe number of distinct characters used is "<<countit<<"\n";
    int n = countit;
    char letter[n];
    unsigned freq[n];
    int st=0;
    for(int i=0; i<128; i++)
    {
        if(t[i]!=0)
        {
            letter[st] = char(i);
            freq[st++] = t[i];
        }
    }
    for(int i=0; i<n; ++i)
        cout<<"\nFrequency of "<<letter[i]<<" : "<<freq[i];
    cout<<"\nThe codes are \n";
    executeTree(letter,freq,n);
    cout<<"\nThe encoded string for "<<a<<" is \n";
    for(int i=0; i<p; ++i) cout<<code[a[i]];

    return 0;
}
