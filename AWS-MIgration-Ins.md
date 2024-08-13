BAD Code: "rsync -avz --exclude 'node_modules' --exclude '.git' \
-e "ssh -i ~/Desktop/Headstart/.ssh/alabama-shiva-windows.pem" \
. ubuntu@ec2-3-149-27-122.us-east-2.compute.amazonaws.com:~/app "

Correct Code: 
1. scp -r -i "C:\users\shiva\Desktop\Headstart\ssh\alabama-shiva-windows.pem" * ubuntu@ec2-3-149-27-122.us-east-2.compute.amazonaws.com:~/app

2. rsync -avz --exclude 'node_modules' -e "ssh -i C:\users\shiva\Desktop\Headstart\ssh\alabama-shiva-windows.pem" ./ ubuntu@ec2-3-149-27-122.us-east-2.compute.amazonaws.com:~/app

sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
