import sys
import os
from src.features import build, update
import asyncio


def main(args): 
    print("Starting application with argument {}".format(args))
    if (args == "build"):
        build.main()
    if (args == "update"): 
        update.main()
    return
    


if __name__ == "__main__": 
    main(sys.argv[1])