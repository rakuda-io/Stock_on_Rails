FROM ruby:3.0.1

RUN apt-get update && apt-get install -y nodejs yarn vim mariadb-client

RUN mkdir haito-kun
WORKDIR /haito-kun
COPY Gemfile Gemfile.lock /haito-kun/
RUN bundle install --jobs 4

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]
EXPOSE 3000

CMD [ "rails", "server", "-b", "0.0.0.0" ]