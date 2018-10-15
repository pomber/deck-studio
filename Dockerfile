FROM mhart/alpine-node:10	
# ARG CI	
WORKDIR /usr/src	
COPY package.json yarn.lock lib/ /usr/src/	
COPY lib /usr/src/lib	
RUN yarn install	
COPY . .	
# RUN yarn test	
RUN yarn build	
RUN mv /usr/src/build /public 