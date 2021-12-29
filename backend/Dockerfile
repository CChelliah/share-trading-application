FROM postgres 

ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password 
ENV POSTGRES_DB=shareapplicationdb
ENV POSTGRES_HOST_AUTH_METHOD=trust
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 5432

CMD ["postgres"]

#docker build -t shareapplicationdb .
#docker run --name shareapplicationdb -e -d -p 5432:5432 shareapplicationdb
#psql -h localhost -p 5432 -U user shareapplicationdb
