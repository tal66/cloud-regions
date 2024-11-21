var gcpData = `
africa-south1;['africa-south1-a', 'africa-south1-b', 'africa-south1-c'];Johannesburg; South Africa;-26.21031533; 28.029720082
asia-east1;['asia-east1-a', 'asia-east1-b', 'asia-east1-c'];Changhua County, Taiwan; APAC;24.153451706503425; 120.66058062308157
asia-east2;['asia-east2-a', 'asia-east2-b', 'asia-east2-c'];Hong Kong; APAC;22.32408297677555; 114.1654563834792
asia-northeast1;['asia-northeast1-a', 'asia-northeast1-b', 'asia-northeast1-c'];Tokyo, Japan; APAC;35.68742487971599; 139.76551870398785
asia-northeast2;['asia-northeast2-a', 'asia-northeast2-b', 'asia-northeast2-c'];Osaka, Japan; APAC;34.667413306446754; 135.50217150572527
asia-northeast3;['asia-northeast3-a', 'asia-northeast3-b', 'asia-northeast3-c'];Seoul, South Korea; APAC;37.56152759619316; 126.9933576416437
asia-south1;['asia-south1-a', 'asia-south1-b', 'asia-south1-c'];Mumbai, India; APAC;19.075983;72.877655
asia-south2;['asia-south2-a', 'asia-south2-b', 'asia-south2-c'];Delhi, India; APAC;28.704060;77.102493
asia-southeast1;['asia-southeast1-a', 'asia-southeast1-b', 'asia-southeast1-c'];Jurong West, Singapore; APAC;1.3402841302548933; 103.70592426066537
asia-southeast2;['asia-southeast2-a', 'asia-southeast2-b', 'asia-southeast2-c'];Jakarta, Indonesia; APAC;-6.211297753867217; 106.82882150666781
australia-southeast1;['australia-southeast1-a', 'australia-southeast1-b', 'australia-southeast1-c'];Sydney, Australia; APAC;-33.86617379726856; 151.19424078793278
australia-southeast2;['australia-southeast2-a', 'australia-southeast2-b', 'australia-southeast2-c'];Melbourne, Australia; APAC;-37.81083866089222; 144.95138980383805
europe-west10;['europe-west10-a', 'europe-west10-b', 'europe-west10-c'];Berlin, Germany; Europe;52.520008;13.404954
europe-central2;['europe-central2-a', 'europe-central2-b', 'europe-central2-c'];Warsaw, Poland; Europe;52.226546515160976; 20.99183704310184
europe-north1;['europe-north1-a', 'europe-north1-b', 'europe-north1-c'];Hamina, Finland; Europe;60.56921048419854; 27.18708372407765
europe-southwest1;['europe-southwest1-a', 'europe-southwest1-b', 'europe-southwest1-c'];Madrid, Spain; Europe;40.414348081053156; -3.715249616097923
europe-west12;['europe-west12-a', 'europe-west12-b', 'europe-west12-c'];Turin, Italy; Europe;45.06886052715622; 7.683844575736766
europe-west1;['europe-west1-b', 'europe-west1-c', 'europe-west1-d'];St. Ghislain, Belgium; Europe;50.47167544809308; 3.809576919595994
europe-west2;['europe-west2-a', 'europe-west2-b', 'europe-west2-c'];London, England; Europe;51.49982139284642; -0.08770004507694035
europe-west3;['europe-west3-a', 'europe-west3-b', 'europe-west3-c'];Frankfurt, Germany; Europe;50.11188151169888; 8.659903583979888
europe-west4;['europe-west4-a', 'europe-west4-b', 'europe-west4-c'];Eemshaven, Netherlands; Europe;53.43871140945339; 6.8320673177368265
europe-west6;['europe-west6-a', 'europe-west6-b', 'europe-west6-c'];Zurich, Switzerland; Europe;47.374097214161296; 8.572255269824675
europe-west8;['europe-west8-a', 'europe-west8-b', 'europe-west8-c'];Milan, Italy; Europe;45.464879583337705; 9.193866710579721
europe-west9;['europe-west9-a', 'europe-west9-b', 'europe-west9-c'];Paris, France; Europe;48.85702658527382; 2.3556164697122557
me-central1;['me-central1-a', 'me-central1-b', 'me-central1-c'];Doha, Qatar; Middle East;25.285446;51.531040
me-central2;['me-central2-a', 'me-central2-b', 'me-central2-c'];Dammam, Saudi Arabia; Middle East;26.439280;50.094460
me-west1;['me-west1-a', 'me-west1-b', 'me-west1-c'];Tel Aviv, Israel; Middle East;32.086331675828596; 34.76686193545308
northamerica-northeast1;['northamerica-northeast1-a', 'northamerica-northeast1-b', 'northamerica-northeast1-c'];Montréal, Québec; North America;45.50137498130507; -73.58965722980639
northamerica-northeast2;['northamerica-northeast2-a', 'northamerica-northeast2-b', 'northamerica-northeast2-c'];Toronto, Ontario; North America;43.651121518295106; -79.38905138152333
northamerica-south1;['northamerica-south1-a', 'northamerica-south1-b', 'northamerica-south1-c'];Queretaro, Mexico; North America;20.580658; -100.418194
southamerica-east1;['southamerica-east1-a', 'southamerica-east1-b', 'southamerica-east1-c'];Osasco, São Paulo, Brazil; South America;-23.531936481737468; -46.790961383301244
southamerica-west1;['southamerica-west1-a', 'southamerica-west1-b', 'southamerica-west1-c'];Santiago, Chile; South America;-33.44864972159181; -70.67309812776982
us-central1;['us-central1-a', 'us-central1-b', 'us-central1-c', 'us-central1-f'];Council Bluffs, Iowa; North America;41.26212299898292; -95.86522216227864
us-east1;['us-east1-b', 'us-east1-c', 'us-east1-d'];Moncks Corner, South Carolina; North America;33.19563420169313; -80.01320509376004
us-east4;['us-east4-a', 'us-east4-b', 'us-east4-c'];Ashburn, Virginia; North America;39.04355549936828; -77.48896816023031
us-east5;['us-east5-a', 'us-east5-b', 'us-east5-c'];Columbus, Ohio; North America;39.96392372641497; -82.99083645584848
us-south1;['us-south1-a', 'us-south1-b', 'us-south1-c'];Dallas, Texas; North America;32.774988885619244; -96.80159861555319
us-west1;['us-west1-a', 'us-west1-b', 'us-west1-c'];The Dalles, Oregon; North America;45.594342863890205; -121.18192901236092
us-west2;['us-west2-a', 'us-west2-b', 'us-west2-c'];Los Angeles, California; North America;34.04975038406567; -118.25658307791038
us-west3;['us-west3-a', 'us-west3-b', 'us-west3-c'];Salt Lake City, Utah; North America;40.75968558565953; -111.89439437097407
us-west4;['us-west4-a', 'us-west4-b', 'us-west4-c'];Las Vegas, Nevada; North America;36.17149326080957; -115.13037593376762
`;
