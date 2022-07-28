

def write_table(in_filename, md_filename):
    with open(in_filename, 'r') as csvfile:
        with open(md_filename, 'w') as mdfile:
            headers_list = next(csvfile).split(";")
            l = len(headers_list)

            mdfile.write("|".join(headers_list))
            mdfile.write("--- |" * l + '\n')

            for row in csvfile:
                values = row.split(";")
                mdfile.write("|".join(values))


filenames = ['files/result_aws.txt',
             'files/result_azure.txt', 'files/result_gcp.txt']

for filename in filenames:
    md_filename = f'{filename.removesuffix(".txt")}.md'
    write_table(filename, md_filename)
